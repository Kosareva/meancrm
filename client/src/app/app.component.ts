import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {LocalStorageKeys} from "./shared/enums/LocalStorageKeys";

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    const potentialToken = localStorage.getItem(LocalStorageKeys.AUTH_TOKEN);
    if (potentialToken) {
      this.authService.setToken(potentialToken);
    }
  }

}
