import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PositionsRestService} from "../../../../shared/rest/api/positions-rest.service";
import {Position} from "../../../../shared/rest/model/Position";
import {MaterialInstance, MaterialService} from "../../../../shared/services/material.service";
import {BaseComponent} from "../../../../common/abstractions/BaseComponent.abstract";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PositionsFormControls} from "./model/PositionsFormControls";
import {displayFieldCss, isFieldHasError, isFieldInvalid} from "../../../../common/utils/Utils";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.sass']
})
export class PositionsFormComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  displayFieldCss = (fieldName: string) => displayFieldCss.apply(this, [fieldName, this.form]);
  isFieldHasError = (fieldName: string, errorName: string) => isFieldHasError.apply(this, [fieldName, errorName, this.form]);
  isFieldInvalid = (fieldName: string) => isFieldInvalid.bind(this, [fieldName, this.form]);
  @Input() categoryId: string;
  form: FormGroup;
  readonly formControls: typeof PositionsFormControls = PositionsFormControls;
  loading = false;
  modal: MaterialInstance;
  @ViewChild('modal', {static: true}) modalRef: ElementRef;
  positions: Position[] = [];
  positionId = null;

  constructor(
    private positionsRestService: PositionsRestService,
  ) {
    super();
  }

  ngOnInit() {
    this.form = new FormGroup({
      [this.formControls.NAME]: new FormControl(null, Validators.required),
      [this.formControls.COST]: new FormControl(1, [Validators.required, Validators.min(1)]),
    });

    this.loading = true;
    this.positionsRestService.positionCollectionResourceGet(this.categoryId)
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe(positions => {
        this.positions = positions;
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.modal.destroy();
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  onAddPosition(): void {
    this.positionId = null;
    this.form.reset({
      [PositionsFormControls.NAME]: null,
      [PositionsFormControls.COST]: 1
    });
    this.modal.open();
    MaterialService.updateTextInputs();
  }

  onCancel(): void {
    this.modal.close();
  }

  onDeletePosition(position: Position): void {
    const decision = window.confirm(`Are you sure you want to delete ${position.name} ?`);
    if (decision) {
      this.positionsRestService.positionResourceDelete(position._id)
        .pipe(
          takeUntil(this.unsubscribe)
        )
        .subscribe(
          resp => {
            const ind = this.positions.findIndex((pos) => position._id === pos._id);
            this.positions.splice(ind, 1);
            MaterialService.toast(resp.message);
          },
          e => MaterialService.toast(e.error.message)
        )
    }
  }

  onSelectPosition(position: Position): void {
    this.positionId = position._id;
    this.form.patchValue({
      [PositionsFormControls.NAME]: position.name,
      [PositionsFormControls.COST]: +position.cost
    });
    this.modal.open();
    MaterialService.updateTextInputs();
  }

  onSubmit(): void {
    this.form.disable();

    const newPosition: Position = {
      name: this.form.value[PositionsFormControls.NAME],
      cost: +this.form.value[PositionsFormControls.COST],
      category: this.categoryId
    };

    const completed = () => {
      this.modal.close();
      this.form.reset({
        [PositionsFormControls.NAME]: '',
        [PositionsFormControls.COST]: 1
      });
      this.form.enable();
    };

    if (this.positionId) {
      newPosition._id = this.positionId;

      this.positionsRestService.positionResourcePatch(newPosition)
        .pipe(
          takeUntil(this.unsubscribe)
        )
        .subscribe(
          position => {
            MaterialService.toast('Position has been updated');
            const ind = this.positions.findIndex((pos) => position._id === pos._id);
            this.positions.splice(ind, 1, position);
          },
          e => {
            MaterialService.toast(e.error.message);
          },
          completed
        );
    } else {
      this.positionsRestService.positionResourcePost(newPosition)
        .pipe(
          takeUntil(this.unsubscribe)
        )
        .subscribe(
          position => {
            MaterialService.toast('Position has been created');
            this.positions.push(position);
          },
          e => {
            MaterialService.toast(e.error.message);
          },
          completed
        );
    }

  }

}
