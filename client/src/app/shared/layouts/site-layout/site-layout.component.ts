import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RoutesAliases} from "../../enums/RoutesAliases";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MaterialService} from "../../services/material.service";
import {BaseComponent} from "../../abstractions/BaseComponent.abstract";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent extends BaseComponent implements AfterViewInit {

  @ViewChild('floating', {static: true}) floatingRef: ElementRef;

  links = [
    {
      url: `/${RoutesAliases.OVERVIEW}`,
      name: 'Overview'
    },
    {
      url: `/${RoutesAliases.ANALYTICS}`,
      name: 'Analytics'
    },
    {
      url: `/${RoutesAliases.HISTORY}`,
      name: 'History'
    },
    {
      url: `/${RoutesAliases.ORDER}`,
      name: 'Create an order'
    },
    {
      url: `/${RoutesAliases.CATEGORIES}`,
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
    this.router.navigate(['/', RoutesAliases.LOGIN]);
  }

}
