import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Position} from "../model/Position";
import {Message} from "../../../common/types/Message";

@Injectable({
  providedIn: 'root'
})
export class PositionsRestService {

  constructor(private http: HttpClient) {
  }

  positionCollectionResourceGet(categoryId: string): Observable<Position[]> {
    return this.http.get<Position[]>(`api/position/${categoryId}`);
  }

  positionResourcePost(position: Position): Observable<Position> {
    return this.http.post<Position>('api/position', position);
  }

  positionResourcePatch(position: Position): Observable<Position> {
    return this.http.patch<Position>(`api/position/${position._id}`, position);
  }

  positionResourceDelete(id: string): Observable<Message> {
    return this.http.delete<Message>(`api/position/${id}`);
  }
}
