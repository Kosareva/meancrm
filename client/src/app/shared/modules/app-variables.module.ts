import {InjectionToken, NgModule} from '@angular/core';

export const BASE_PATH = new InjectionToken<string>('basePath');

@NgModule({
  // providers: [{
  //   provide: BASE_PATH,
  //   useValue: environment.basePath
  // }],
})
export class AppVariablesModule {
}
