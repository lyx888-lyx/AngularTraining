import { NgModule } from '@angular/core';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {WyUiModule} from "./wy-ui/wy-ui.module";

// 共享模块

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    WyUiModule
  ],
  exports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    WyUiModule
  ]
})
export class ShareModule { }
