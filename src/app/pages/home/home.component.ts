import {Component, OnInit, ViewChild} from '@angular/core';
import {HomeService} from "../../service/home.service";
import {Banner, HotTag, Singer, SongSheet} from "../../service/data-types/common.types";
import {NzCarouselComponent} from "ng-zorro-antd";
import {SingerService} from "../../service/singer.service";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";
import {SheetService} from "../../service/sheet.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  carouselActiveIndex = 0;
  banners: Banner[];
  tags: HotTag[];
  sheets: SongSheet[];
  singers: Singer[];

  @ViewChild(NzCarouselComponent, {static: true}) private nzCarousel: NzCarouselComponent;

  constructor(
    private homeService: HomeService,
    private singerService: SingerService,
    private route: ActivatedRoute,
    private sheetService: SheetService
  ) {
    this.route.data.pipe(map(res => res.homeData)).subscribe(([banners, hotTags, songSheetList, singers]) => {
      this.banners = banners;
      this.tags = hotTags;
      this.sheets = songSheetList;
      this.singers = singers;
    });
  }


  ngOnInit() {
  }

  onBeforeChange({to}) {
    this.carouselActiveIndex = to;
  }

  onChangeSlide(type: 'pre' | 'next') {
    this.nzCarousel[type]();
  }

  onPlaySheet(id: number) {
    this.sheetService.playSheet(id).subscribe(res => {
      console.log(res);
    });
  }

  // 次数用上面 resolve 方法更加简洁
  // // 获取轮播图
  // private getBanners() {
  //   this.homeService.getBanners().subscribe(banners => {
  //     this.banners = banners;
  //   });
  // }
  // // 获取热门分类
  // private getHotTags() {
  //   this.homeService.getHotTags().subscribe(tags => {
  //     console.log(tags);
  //     this.tags = tags;
  //   })
  // }
  // // 获取热门歌单
  // private getPersonalSheetList() {
  //   this.homeService.getPersonalSheetList().subscribe(sheets => {
  //     console.log(sheets)
  //     this.sheets = sheets;
  //   })
  // }
  //
  // // 获取入驻歌手列表
  // private getEnterSingers() {
  //   this.singerService.getEnterSinger().subscribe(singer => {
  //     console.log(singer);
  //     this.singers = singer;
  //   });
  // }
}
