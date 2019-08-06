import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {LoginResponse, User} from "../rest/model";
import {AuthRestService} from "../rest/api";
import {tap} from "rxjs/operators";
import {localStorageKeys} from "../../common/enums/localStorageKeys";

@Injectable({providedIn: "root"})
export class AuthService {

  private token: string = null;

  constructor(
    private authRestService: AuthRestService
  ) {
  }

  login(userCredentials): Observable<LoginResponse> {
    return this.authRestService.login(userCredentials)
      .pipe(
        tap(
          (loginResponse) => {
            localStorage.setItem(localStorageKeys.AUTH_TOKEN, loginResponse.token);
            this.setToken(loginResponse.token);
          }
        )
      );
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
  }

  register(userCredentials): Observable<User> {
    return this.authRestService.register(userCredentials);
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

}
