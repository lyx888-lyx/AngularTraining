import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-wy-carousel',
  templateUrl: './wy-carousel.component.html',
  styleUrls: ['./wy-carousel.component.less'],
  // 变更检测 OnPush 只会在 @Input() 时进行变更检测, 提升性能
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyCarouselComponent implements OnInit {
  // 变更检测之前的模板查询时间, 静态视图
  @ViewChild("dot", { static: true }) dotRef: TemplateRef<any>;
  @Input() activeIndex = 0;
  // 泛型定义死, 为 pre 或 next 值为官网给定, 减小传参出错率
  @Output() changeSlide = new EventEmitter<'pre' | 'next'>();

  constructor() { }

  ngOnInit() {
  }

  onChangeSlide(type: 'pre' | 'next') {
    this.changeSlide.emit(type);
  }
}
