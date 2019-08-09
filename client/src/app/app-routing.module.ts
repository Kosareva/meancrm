import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {SiteLayoutComponent} from "./shared/layouts/site-layout/site-layout.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {RegistrationPageComponent} from "./pages/registration-page/registration-page.component";
import {RoutesAliases} from "./shared/enums/RoutesAliases";
import {AuthGuard} from "./shared/guards/auth.guard";
import {OverviewPageComponent} from "./pages/overview-page/overview-page.component";
import {CategoriesPageComponent} from "./pages/categories-page/categories-page.component";
import {OrderPageComponent} from "./pages/order-page/order-page.component";
import {HistoryPageComponent} from "./pages/history-page/history-page.component";
import {AnalyticsPageComponent} from "./pages/analytics-page/analytics-page.component";
import {CategoriesFormComponent} from "./pages/categories-page/categories-form/categories-form.component";
import {RoutesParams} from "./shared/enums/RoutesParams";
import {OrderCategoriesComponent} from "./pages/order-page/order-categories/order-categories.component";
import {OrderPositionsComponent} from "./pages/order-page/order-positions/order-positions.component";

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: RoutesAliases.LOGIN, pathMatch: 'full'},
      {path: RoutesAliases.LOGIN, component: LoginPageComponent},
      {path: RoutesAliases.REGISTER, component: RegistrationPageComponent}
    ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      {path: RoutesAliases.OVERVIEW, component: OverviewPageComponent,},
      {path: RoutesAliases.ANALYTICS, component: AnalyticsPageComponent,},
      {path: RoutesAliases.HISTORY, component: HistoryPageComponent,},
      {
        path: RoutesAliases.ORDER, component: OrderPageComponent, children: [
          {path: '', component: OrderCategoriesComponent},
          {path: ':id', component: OrderPositionsComponent},
        ]
      },
      {path: RoutesAliases.CATEGORIES, component: CategoriesPageComponent,},
      {path: `${RoutesAliases.CATEGORIES}/${RoutesAliases.NEW}`, component: CategoriesFormComponent,},
      {path: `${RoutesAliases.CATEGORIES}/:${RoutesParams.ID}`, component: CategoriesFormComponent,},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
