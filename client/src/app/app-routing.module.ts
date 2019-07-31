import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {SiteLayoutComponent} from "./shared/layouts/site-layout/site-layout.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {RegistrationPageComponent} from "./pages/registration-page/registration-page.component";
import {routesAliases} from "./common/enums/routesAliases";
import {AuthGuard} from "./common/guards/auth.guard";
import {OverviewPageComponent} from "./pages/overview-page/overview-page.component";

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: routesAliases.LOGIN, pathMatch: 'full'},
      {path: routesAliases.LOGIN, component: LoginPageComponent},
      {path: routesAliases.REGISTER, component: RegistrationPageComponent}
    ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      {
        path: routesAliases.OVERVIEW, component: OverviewPageComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
