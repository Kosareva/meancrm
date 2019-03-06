import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {LoginRTO} from "../../rest/model";
import {AuthRestService} from "../../rest/api";

@Injectable({providedIn: "root"})
export class AuthService {

    constructor(
        private authRestService: AuthRestService
    ) {
    }

    login(user): Observable<LoginRTO> {
        return this.authRestService.login(user);
    }

    register() {
    }

}
