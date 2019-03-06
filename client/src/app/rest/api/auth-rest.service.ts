import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRTO, User} from "../model";
import {Observable} from "rxjs";

@Injectable({providedIn: "root"})
export class AuthRestService {

    constructor(private http: HttpClient) {
    }

    login(user: User): Observable<LoginRTO> {
        return this.http.post<LoginRTO>('api/auth/login', user);
    }

    register() {

    }

}
