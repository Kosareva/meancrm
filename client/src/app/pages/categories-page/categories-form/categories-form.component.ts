import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../../common/abstractions/BaseComponent.abstract";
import {ActivatedRoute, Params} from "@angular/router";
import {switchMap, takeUntil} from "rxjs/operators";
import {routesParams} from "../../../common/enums/routesParams";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriesFormControls} from "./model/CategoriesFormControls";
import {isFieldInvalid, displayFieldCss, isFieldHasError} from "../../../common/utils/Utils";
import {CategoriesRestService} from "../../../core/rest/api/categories-rest.service";
import {of} from "rxjs/internal/observable/of";
import {MaterialService} from "../../../common/services/material.service";
import {error} from "selenium-webdriver";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.sass']
})
export class CategoriesFormComponent extends BaseComponent implements OnInit {

  displayFieldCss = (fieldName: string) => displayFieldCss.apply(this, [fieldName, this.form]);
  isFieldHasError = (fieldName: string, errorName: string) => isFieldHasError.apply(this, [fieldName, errorName, this.form]);
  isFieldInvalid = (fieldName: string) => isFieldInvalid.bind(this, [fieldName, this.form]);
  isNew = true;
  form: FormGroup;
  readonly formControls: typeof CategoriesFormControls = CategoriesFormControls;

  constructor(
    private categoriesRestService: CategoriesRestService,
    private route: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit(): void {

    this.form = new FormGroup({
      [this.formControls.NAME]: new FormControl(null, [Validators.required, Validators.minLength(3)])
    });

    this.form.disable();

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params[routesParams.ID]) {
            this.isNew = false;
            return this.categoriesRestService.categoryResourceGet(params[routesParams.ID])
          }
          return of(null);
        })
      )
      .subscribe(category => {
        if (category) {
          this.form.patchValue({
            [this.formControls.NAME]: category.name
          });
          MaterialService.updateTextInputs();
        }
        this.form.enable();
      }, e => {
        MaterialService.toast(e.error.message)
      });

  }

  onSubmit(): void {

  }

}
