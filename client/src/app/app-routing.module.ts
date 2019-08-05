import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {RoutesAliases} from './common/enums/RoutesAliases.enum';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component';

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: RoutesAliases.LOGIN, pathMatch: 'full'},
      {path: RoutesAliases.LOGIN, component: LoginPageComponent},
      {path: RoutesAliases.REGISTER, component: RegisterPageComponent}
    ]
  },
  {
    path: '', component: SiteLayoutComponent, children: []
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
