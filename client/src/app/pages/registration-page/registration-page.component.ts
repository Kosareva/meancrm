import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {User, UserCredentials} from "../../services/rest/model";
import {Unsubscribable} from "../../common/types/Unsubscribable.interface";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Router} from '@angular/router';
import {routesAliases} from "../../common/enums/routesAliases.enum";
import {activatedRouteQueryParams} from "../../common/constants/activatedRouteQueryParams";

@Component({
  selector: 'app-register-form',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit, OnDestroy, Unsubscribable {

  unsubscribe = new Subject<void>();
  readonly registrationFormControls: any = {
    EMAIL: 'email',
    PASSWORD: 'password',
  };

  form: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      [this.registrationFormControls.EMAIL]: new FormControl(null, [Validators.required, Validators.email]),
      [this.registrationFormControls.PASSWORD]: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
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
          this.router.navigate([`/${routesAliases.LOGIN}`], {
            queryParams: {
              [activatedRouteQueryParams[routesAliases.LOGIN].REGISTERED]: true
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
