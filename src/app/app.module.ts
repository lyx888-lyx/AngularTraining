import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {A11yModule} from "@angular/cdk/a11y";

// 根组件

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
