import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd';
import {CoreModule} from './core/core.module';
import {A11yModule} from "@angular/cdk/a11y";



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    A11yModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
