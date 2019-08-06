import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../../common/abstractions/BaseComponent.abstract";
import {CategoriesRestService} from "../../../shared/rest/api/categories-rest.service";
import {Observable} from "rxjs";
import {Category} from "../../../shared/rest/model/Category";

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.sass']
})
export class OrderCategoriesComponent extends BaseComponent implements OnInit {

  categories$: Observable<Category[]>;

  constructor(
    private categoriesRestService: CategoriesRestService,
  ) {
    super();
  }

  ngOnInit() {
    this.categories$ = this.categoriesRestService.categoryCollectionResourceGet();
  }

}
