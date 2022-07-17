import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {forkJoin, Observable} from "rxjs";
import {HomeService} from "../../service/home.service";
import {SingerService} from "../../service/singer.service";
import {Banner, HotTag, Singer, SongSheet} from "../../service/data-types/common.types";
import {first} from "rxjs/operators";

type HomeDataType = [Banner[], HotTag[], SongSheet[], Singer[]]

@Injectable()
// 路由守卫
export class HomeResolveService implements Resolve<HomeDataType> {
  constructor(private homeService: HomeService, private singerService: SingerService) {}

  resolve(): Observable<HomeDataType> {
    return forkJoin([
      this.homeService.getBanners(),
      this.homeService.getHotTags(),
      this.homeService.getPersonalSheetList(),
      this.singerService.getEnterSinger()
    ]).pipe(first());   // 只取第一个流
  }
}
