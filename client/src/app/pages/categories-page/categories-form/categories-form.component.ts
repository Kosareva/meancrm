import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../../common/abstractions/BaseComponent.abstract";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {switchMap, take, takeUntil} from "rxjs/operators";
import {routesParams} from "../../../common/enums/routesParams";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriesFormControls} from "./model/CategoriesFormControls";
import {isFieldInvalid, displayFieldCss, isFieldHasError} from "../../../common/utils/Utils";
import {CategoriesRestService} from "../../../core/rest/api/categories-rest.service";
import {of} from "rxjs/internal/observable/of";
import {MaterialService} from "../../../common/services/material.service";
import {error} from "selenium-webdriver";
import {HttpErrorResponse} from "@angular/common/http";
import {Category} from "../../../core/rest/model/Category";
import {Observable} from "rxjs";
import {routesAliases} from "../../../common/enums/routesAliases";

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.sass']
})
export class CategoriesFormComponent extends BaseComponent implements OnInit {

  displayFieldCss = (fieldName: string) => displayFieldCss.apply(this, [fieldName, this.form]);
  isFieldHasError = (fieldName: string, errorName: string) => isFieldHasError.apply(this, [fieldName, errorName, this.form]);
  isFieldInvalid = (fieldName: string) => isFieldInvalid.bind(this, [fieldName, this.form]);
  category: Category;
  image: File;
  imagePreview: string | ArrayBuffer = '';
  isNew = true;
  form: FormGroup;
  readonly formControls: typeof CategoriesFormControls = CategoriesFormControls;

  constructor(
    private categoriesRestService: CategoriesRestService,
    private route: ActivatedRoute,
    private router: Router,
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
          this.category = category;
          this.form.patchValue({
            [this.formControls.NAME]: category.name
          });
          this.imagePreview = category.imageSrc;
          MaterialService.updateTextInputs();
        }
        this.form.enable();
      }, e => {
        MaterialService.toast(e.error.message)
      });

  }

  deleteCategory(): void {
    const decision = window.confirm(`Are you sure you want to remove category ${this.category.name}`);
    if (decision) {
      this.categoriesRestService.categoryResourceDelete(this.category._id)
        .subscribe(
          resp => MaterialService.toast(resp.message),
          e => MaterialService.toast(e.error.message),
          () => this.router.navigate(['/', routesAliases.CATEGORIES])
        );
    }
  }

  onFileUpload(event: any): void {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    let manageCategory$: Observable<Category>;
    this.form.disable();
    if (this.isNew) {
      manageCategory$ = this.categoriesRestService.categoryResourcePost(this.form.value[this.formControls.NAME], this.image);
    } else {
      manageCategory$ = this.categoriesRestService.categoryResourcePatch(this.category._id, this.form.value.name, this.image);
    }

    manageCategory$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(category => {
        this.category = category;
        MaterialService.toast('Changes saved');
        this.form.enable();
      }, e => {
        MaterialService.toast(e.error.message);
        this.form.enable();
      });
  }

}
