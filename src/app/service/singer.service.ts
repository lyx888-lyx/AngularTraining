import {Inject, Injectable} from '@angular/core';
import {API_CONFIG, ServiceModule} from "./service.module";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Singer} from "./data-types/common.types";
import * as queryString from "querystring";

type SingerParams = {
  offset: number;
  limit: number;
  cat?: string;
}
const defaultParams: SingerParams = {
  offset: 0,
  limit: 9,
  cat: '5001'
}

@Injectable({
  providedIn: ServiceModule
})

export class SingerService {
  constructor(private http: HttpClient, @Inject(API_CONFIG) private uri: string) {
  }
  // 获取入驻歌手的列表
  getEnterSinger(args: SingerParams = defaultParams): Observable<Singer[]> {
    const params = new HttpParams({ fromString: queryString.stringify(args) });
    return this.http.get(this.uri + 'artist/list', {params})
      // 使用 map 为了对数据指明类型
      .pipe(map((res: { artists: Singer[] }) => res.artists));
  }
}
