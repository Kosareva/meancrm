import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../common/services/auth.service";
import {LoginRTO, User} from "../rest/model";

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

    readonly loginFormControls: any = {
        EMAIL: 'email',
        PASSWORD: 'password',
    };

    form: FormGroup;

    constructor(private authService: AuthService,) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            [this.loginFormControls.EMAIL]: new FormControl(null, [Validators.required, Validators.email]),
            [this.loginFormControls.PASSWORD]: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        });
    }

    onSubmit() {
        this.authService.login(<User>this.form.value)
            .subscribe(
                (loginRto: LoginRTO) => {
                    console.log('LOGIN RTO', loginRto);
                },
                e => {
                    console.error(e);
                }
            );
    }

}
