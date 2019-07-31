import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {routesAliases} from "../../../common/enums/routesAliases";
import {AuthService} from "../../../core/auth/auth.service";
import {Router} from "@angular/router";
import {MaterialService} from "../../../common/services/material.service";
import {BaseComponent} from "../../../common/abstractions/BaseComponent.abstract";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent extends BaseComponent implements AfterViewInit {

  @ViewChild('floating', {static: true}) floatingRef: ElementRef;

  links = [
    {
      url: `/${routesAliases.OVERVIEW}`,
      name: 'Overview'
    },
    {
      url: `/${routesAliases.ANALYTICS}`,
      name: 'Analytics'
    },
    {
      url: `/${routesAliases.HISTORY}`,
      name: 'History'
    },
    {
      url: `/${routesAliases.ORDER}`,
      name: 'Create an order'
    },
    {
      url: `/${routesAliases.CATEGORIES}`,
      name: 'Categories'
    },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    super();
    console.log('SITE LAYOUT called');
  }

  ngAfterViewInit(): void {
    MaterialService.initializeFloatingButton(this.floatingRef);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/', routesAliases.LOGIN]);
  }

}
