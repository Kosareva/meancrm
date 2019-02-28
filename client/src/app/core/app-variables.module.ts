import {InjectionToken, NgModule} from '@angular/core';
import {environment} from "../src/environments/environment";

export const BASE_PATH = new InjectionToken<string>('basePath');

@NgModule({
  providers: [{
    provide: BASE_PATH,
    useValue: environment.basePath
  }],
})
export class AppVariablesModule {
}
