import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/auth/auth.service";
import {LoginResponse, UserCredentials} from "../../core/rest/model";
import {takeUntil} from "rxjs/operators";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {routesAliases} from "../../common/enums/routesAliases";
import {activatedRouteQueryParams} from "../../common/constants/activatedRouteQueryParams";
import {MaterialService} from "../../common/services/material.service";
import {BaseComponent} from "../../common/abstractions/BaseComponent.abstract";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent extends BaseComponent implements OnInit {

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
    super();
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
          MaterialService.toast('Now you can login');
        } else if (params[activatedRouteQueryParams[routesAliases.LOGIN].ACCESS_DENIED]) {
          MaterialService.toast('You need to authorize');
        } else if (params[activatedRouteQueryParams[routesAliases.LOGIN].SESSION_FAILED]) {
          MaterialService.toast('Please, reauthorize');
        }
      })
  }

  onSubmit() {
    this.form.disable();
    this.authService.login(<UserCredentials>this.form.value)
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe((loginRto: LoginResponse) => {
          this.router.navigate([`/${routesAliases.OVERVIEW}`])
            .catch((e) => {
              console.log(e);
              this.form.enable();
            });
        }, e => {
          console.error(e);
          // TODO: handle error with error handler
          MaterialService.toast(e.error.message);
          this.form.enable();
        }
      );
  }

}
