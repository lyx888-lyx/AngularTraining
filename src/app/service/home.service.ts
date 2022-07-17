import {Inject, Injectable} from '@angular/core';
import {API_CONFIG, ServiceModule} from "./service.module";
import {Observable} from "rxjs";
import {Banner} from "./data-types/common.types";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: ServiceModule
})
export class HomeService {
  constructor(private http: HttpClient, @Inject(API_CONFIG) private uri: string) {
  }
  // 获取轮播图数据的请求
  // Observable<Banner[]> 返回结果校验
  getBanners(): Observable<Banner[]> {
    return this.http.get(this.uri + 'banner')
      // 使用 map 为了对数据指明类型
      .pipe(map((res: { banners: Banner[] }) => res.banners));
  }
}
