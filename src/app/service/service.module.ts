import {InjectionToken, NgModule} from '@angular/core';

// 服务模块

export const API_CONFIG = new InjectionToken("ApiConfigToken");

@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    {provide: API_CONFIG, useValue: 'http://localhost:3000/'}
  ]
})
export class ServiceModule { }
