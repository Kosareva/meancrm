import {Component, OnInit} from '@angular/core';
import {AuthService} from "./core/auth/auth.service";
import {localStorageKeys} from "./common/enums/localStorageKeys";

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    const potentialToken = localStorage.getItem(localStorageKeys.AUTH_TOKEN);
    if (potentialToken) {
      this.authService.setToken(potentialToken);
    }
  }

}
