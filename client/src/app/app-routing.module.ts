import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {SiteLayoutComponent} from "./shared/layouts/site-layout/site-layout.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {RegistrationPageComponent} from "./pages/registration-page/registration-page.component";
import {routesAliases} from "./common/enums/routesAliases";
import {AuthGuard} from "./common/guards/auth.guard";
import {OverviewPageComponent} from "./pages/overview-page/overview-page.component";
import {CategoriesPageComponent} from "./pages/categories-page/categories-page.component";
import {OrderPageComponent} from "./pages/order-page/order-page.component";
import {HistoryPageComponent} from "./pages/history-page/history-page.component";
import {AnalyticsPageComponent} from "./pages/analytics-page/analytics-page.component";
import {CategoriesFormComponent} from "./pages/categories-page/categories-form/categories-form.component";
import {routesParams} from "./common/enums/routesParams";
import {OrderCategoriesComponent} from "./pages/order-page/order-categories/order-categories.component";
import {OrderPositionsComponent} from "./pages/order-page/order-positions/order-positions.component";

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
      {path: routesAliases.OVERVIEW, component: OverviewPageComponent,},
      {path: routesAliases.ANALYTICS, component: AnalyticsPageComponent,},
      {path: routesAliases.HISTORY, component: HistoryPageComponent,},
      {
        path: routesAliases.ORDER, component: OrderPageComponent, children: [
          {path: '', component: OrderCategoriesComponent},
          {path: ':id', component: OrderPositionsComponent},
        ]
      },
      {path: routesAliases.CATEGORIES, component: CategoriesPageComponent,},
      {path: `${routesAliases.CATEGORIES}/${routesAliases.NEW}`, component: CategoriesFormComponent,},
      {path: `${routesAliases.CATEGORIES}/:${routesParams.ID}`, component: CategoriesFormComponent,},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
