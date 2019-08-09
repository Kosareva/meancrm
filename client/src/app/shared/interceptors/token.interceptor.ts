import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AuthService} from "../services/auth.service";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {RoutesAliases} from "../enums/RoutesAliases";
import {activatedRouteQueryParams} from "../constants/activatedRouteQueryParams";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: this.authService.getToken()
        }
      });
    }
    return next.handle(req)
      .pipe(
        catchError((e: HttpErrorResponse) => this.handleAuthError(e))
      );
  }

  private handleAuthError(e: HttpErrorResponse): Observable<any> {
    if (e.status === 401) {
      this.router.navigate(['/', RoutesAliases.LOGIN], {
        queryParams: {
          [activatedRouteQueryParams[RoutesAliases.LOGIN].SESSION_FAILED]: true
        }
      });
    }
    return throwError(e);
  }

}
