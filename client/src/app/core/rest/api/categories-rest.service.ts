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

  categoryResourceGet(id: string): Observable<Category> {
    return this.http.get<Category>(`api/category/${id}`);
  }

  categoryResourcePost(name: string, image?: File): Observable<Category> {
    const fd = new FormData();
    if (image) {
      fd.append('image', image, image.name)
    }
    fd.append('name', name);
    return this.http.post<Category>('api/category', fd);
  }

  categoryResourcePatch(id: string, name: string, image?: File): Observable<Category> {
    const fd = new FormData();
    if (image) {
      fd.append('image', image, image.name)
    }
    fd.append('name', name);
    return this.http.patch<Category>(`api/category/${id}`, fd);
  }
}
