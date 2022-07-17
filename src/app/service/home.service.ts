import {Inject, Injectable} from '@angular/core';
import {API_CONFIG, ServiceModule} from "./service.module";
import {Observable} from "rxjs";
import {Banner, HotTag, SongSheet} from "./data-types/common.types";
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

  // 获取热门标签
  getHotTags(): Observable<HotTag[]> {
    return this.http.get(this.uri + "playlist/hot")
      .pipe(map((res:{ tags: HotTag[] }) => {
        return res.tags.sort((x: HotTag, y: HotTag) => x.position - y.position).slice(0, 5);
      }));
  }
  // 获取热门歌单
  getPersonalSheetList(): Observable<SongSheet[]> {
    return this.http.get(this.uri + "personalized")
      .pipe(map((res:{ result: SongSheet[] }) => res.result.slice(0, 16)));
  }
}
