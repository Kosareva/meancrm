import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginResponse, User, UserCredentials} from "../model";
import {Observable} from "rxjs";

@Injectable({providedIn: "root"})
export class AuthRestService {

  constructor(private http: HttpClient) {
  }

  login(userCredentials: UserCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('api/auth/login', userCredentials);
  }

  register(userCredentials: UserCredentials): Observable<User> {
    return this.http.post<User>('api/auth/register', userCredentials)
  }

}
