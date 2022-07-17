import {Component, OnInit, ViewChild} from '@angular/core';
import {HomeService} from "../../service/home.service";
import {Banner} from "../../service/data-types/common.types";
import {FromToInterface, NzCarouselComponent} from "ng-zorro-antd";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  carouselActiveIndex = 0;
  banners: Banner[];
  @ViewChild(NzCarouselComponent, {static: true}) private nzCarousel: NzCarouselComponent;

  constructor(private homeService: HomeService) {
    this.homeService.getBanners().subscribe(banners => {
      this.banners = banners;
      // console.log("banners: ", banners);
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
}
