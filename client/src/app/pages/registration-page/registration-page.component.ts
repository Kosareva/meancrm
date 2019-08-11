import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {User, UserCredentials} from "../../shared/rest/model";
import {Unsubscribable} from "../../shared/types/Unsubscribable";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Router} from '@angular/router';
import {RoutesAliases} from "../../shared/enums/RoutesAliases";
import {activatedRouteQueryParams} from "../../shared/constants/activatedRouteQueryParams";
import {BaseComponent} from "../../shared/abstractions/BaseComponent.abstract";

@Component({
  selector: 'app-register-form',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent extends BaseComponent implements OnInit, OnDestroy, Unsubscribable {

  readonly registrationFormControls: any = {
    EMAIL: 'email',
    PASSWORD: 'password',
  };

  form: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    super();
  }

  ngOnInit() {
    this.form = new FormGroup({
      [this.registrationFormControls.EMAIL]: new FormControl(null, [Validators.required, Validators.email]),
      [this.registrationFormControls.PASSWORD]: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit() {
    this.form.disable();
    this.authService.register(<UserCredentials>this.form.value)
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe(
        (user: User) => {
          console.log('REGISTERED USER', user);
          this.router.navigate([`/${RoutesAliases.LOGIN}`], {
            queryParams: {
              [activatedRouteQueryParams[RoutesAliases.LOGIN].REGISTERED]: true
            }
          });
        },
        e => {
          console.error(e);
          this.form.enable();
        }
      );
  }

}
