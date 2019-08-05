import {Component, OnInit} from '@angular/core';
import {RoutesAliases} from 'src/app/common/enums/RoutesAliases.enum';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

  readonly RoutesAliases: typeof RoutesAliases = RoutesAliases;

  constructor() {
  }

  ngOnInit() {
  }

}
