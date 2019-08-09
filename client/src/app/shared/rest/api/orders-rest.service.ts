import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../model/Order";
import {Message} from "../../types/Message";

@Injectable({
  providedIn: 'root'
})
export class OrdersRestService {

  constructor(private http: HttpClient) {
  }

  orderCollectionResourceGet(params: any = {}): Observable<Order[]> {
    return this.http.get<Order[]>(`api/order`, {
      params: new HttpParams({
        fromObject: params
      })
    });
  }

  orderResourcePost(order: Order): Observable<Order> {
    return this.http.post<Order>('api/order', order);
  }

  // orderResourcePatch(order: Order): Observable<Order> {
  //   return this.http.patch<Order>(`api/order/${order._id}`, order);
  // }

  // orderResourceDelete(id: string): Observable<Message> {
  //   return this.http.delete<Message>(`api/order/${id}`);
  // }
}
