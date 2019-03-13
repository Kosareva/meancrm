import {Component, OnInit} from '@angular/core';
import {routesAliases} from 'src/app/common/enums/routesAliases.enum';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

  readonly routesAliases: typeof routesAliases = routesAliases;

  constructor() {
    console.log('AUTH LAYOUT called');
  }

  ngOnInit() {
  }

}
