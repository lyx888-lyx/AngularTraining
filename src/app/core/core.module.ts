import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ServiceModule} from "../service/service.module";
import {PagesModule} from "../pages/pages.module";
import {ShareModule} from "../share/share.module";
import zh from "@angular/common/locales/zh";
import {NZ_I18N, zh_CN} from "ng-zorro-antd";

// 核心模块

registerLocaleData(zh);

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServiceModule,
    PagesModule,
    ShareModule,
    AppRoutingModule
  ],
  exports: [
    ShareModule,
    AppRoutingModule
  ],
  // 服务
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
})
export class CoreModule {
  // @SkipSelf() 在查找 CoreModule 的时候跳过自身, 向父 Module 去查找, 这里为了保证 CoreModule 只被引入一次
  // @Optional() 在 CoreModule 未找到时, 赋值未 Null 不会抛出错误
  constructor(@SkipSelf() @Optional() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error("CoreModule 只能被 appModule 引入")
    }
  }
}
