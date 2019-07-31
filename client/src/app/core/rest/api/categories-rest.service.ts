import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../model/Category";

@Injectable({
  providedIn: 'root'
})
export class CategoriesRestService {

  constructor(private http: HttpClient) {
  }

  categoryCollectionResourceGet(): Observable<Category[]> {
    return this.http.get<Category[]>('api/category');
  }
}
