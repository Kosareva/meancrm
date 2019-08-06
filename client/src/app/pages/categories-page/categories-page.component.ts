import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../common/abstractions/BaseComponent.abstract";
import {CategoriesRestService} from "../../shared/rest/api/categories-rest.service";
import {takeUntil} from "rxjs/operators";
import {AppErrorHandler} from "../../shared/services/error-handler.service";
import {Observable} from "rxjs";
import {Category} from "../../shared/rest/model/Category";

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.sass']
})
export class CategoriesPageComponent extends BaseComponent implements OnInit {

  categories$: Observable<Category[]>;

  constructor(
    private eHandler: AppErrorHandler,
    private categoriesRestService: CategoriesRestService,
  ) {
    super();
  }

  ngOnInit() {
    this.categories$ = this.categoriesRestService.categoryCollectionResourceGet()
      .pipe(
        takeUntil(this.unsubscribe)
      );
  }

}
