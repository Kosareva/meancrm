import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {LoginResponse, UserCredentials} from "../../services/rest/model";
import {Unsubscribable} from "../../common/types/Unsubscribable.interface";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {routesAliases} from "../../common/enums/routesAliases.enum";
import {activatedRouteQueryParams} from "../../common/constants/activatedRouteQueryParams";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy, Unsubscribable {

  unsubscribe = new Subject<void>();
  readonly loginFormControls: any = {
    EMAIL: 'email',
    PASSWORD: 'password',
  };

  form: FormGroup;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      [this.loginFormControls.EMAIL]: new FormControl(null, [Validators.required, Validators.email]),
      [this.loginFormControls.PASSWORD]: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });

    this.route.queryParams
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe((params: Params) => {
        if (params[activatedRouteQueryParams[routesAliases.LOGIN].REGISTERED]) {
          // Now you can login
        } else if (params[activatedRouteQueryParams[routesAliases.LOGIN].ACCESS_DENIED]) {
          // Please authorize
        }
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onSubmit() {
    this.form.disable();
    this.authService.login(<UserCredentials>this.form.value)
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe(
        (loginRto: LoginResponse) => {
          console.log('LOGIN RTO', loginRto);
          this.router.navigate([`/${routesAliases.OVERVIEW}`]);
        },
        e => {
          console.error(e);
          this.form.enable();
        }
      );
  }

}
