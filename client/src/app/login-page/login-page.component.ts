import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

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

  constructor() {
  }

  ngOnInit() {
    this.form = new FormGroup({
      [this.loginFormControls.EMAIL]: new FormControl(null, [Validators.required, Validators.email]),
      [this.loginFormControls.PASSWORD]: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit() {

  }

}
