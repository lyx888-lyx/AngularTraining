import {
  ChangeDetectionStrategy,
  Component,
  ElementRef, Inject,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {fromEvent, merge, Observable} from "rxjs";
import {distinctUntilChanged, filter, map, pluck, takeUntil, tap} from "rxjs/operators";
import {SliderEventObserverConfig} from "./wy-slider-types";
import {DOCUMENT} from "@angular/common";
import {sliderEvent} from "./wy-slider-helper";

@Component({
  selector: 'app-wy-slider',
  templateUrl: './wy-slider.component.html',
  styleUrls: ['./wy-slider.component.less'],
  // 视图封装模式
  // 不使用视图封装(能进能出)
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WySliderComponent implements OnInit {
  @Input() wyVertical = false;

  private sliderDom: HTMLDivElement;

  @ViewChild('wySlider', { static: true }) private wySlider: ElementRef;

  private dragStart$: Observable<number>;
  private dragMove$: Observable<number>;
  private dragEnd$: Observable<Event>;

  constructor(@Inject(DOCUMENT) private doc: Document) { }
  ngOnInit() {
    this.sliderDom = this.wySlider.nativeElement;
    this.createDraggingObservables();
  }

  private createDraggingObservables() {
    /**
     * 水平:
     *    track: width
     *    handle: left
     * 垂直:
     *    track: height
     *    handle: bottom
     * pc:
     *    mousedown, mousemove,mouseup
     *    MouseEvent
     *    - 获取当前点击位置
     *    event.pageX | event.pageY
     * phone:
     *    touchstart, touchmove, touchend
     *    TouchEvent
     *    - 获取当前点击位置
     *    event.touches[0].pageX | event.touches[0].pageY
     */
    const orientField = this.wyVertical ? 'pageY' : 'pageX';
    // PC
    const mouse: SliderEventObserverConfig = {
        start: 'mousedown',
        move: 'mousemove',
        end: 'mouseup',
        filter: (e: MouseEvent) => e instanceof MouseEvent,
        pluckKey: [orientField]
    };
    // MOBILE
    const touch: SliderEventObserverConfig = {
      start: 'touchdown',
      move: 'touchmove',
      end: 'touchend',
      filter: (e: MouseEvent) => e instanceof MouseEvent,
      pluckKey: ['touches', '0', orientField]
    };

    [mouse, touch].forEach(source => {
      const { start, move, end, filter: filterFunc, pluckKey } = source;
      // @ts-ignore
      source.startPlucked$ = fromEvent(this.sliderDom, start)
        .pipe(
          filter(filterFunc),
          tap(sliderEvent),
          pluck(...pluckKey),
          map((position: number) => {
          this.findClosestValue(position)})
        );

      source.end$ = fromEvent(this.doc, end);
      // @ts-ignore
      source.moveResolved$ = fromEvent(this.doc, move).pipe(
        filter(filterFunc),
        tap(sliderEvent),
        pluck(...pluckKey),
        // 当值发生改变则继续向下发射流
        distinctUntilChanged(),
        map((position: number) => {
          this.findClosestValue(position)
        }),
        takeUntil(source.end$)
      );
    });

    this.dragStart$ = merge(mouse.startPlucked$, touch.startPlucked$);
    this.dragMove$ = merge(mouse.startPlucked$, touch.startPlucked$);
    this.dragEnd$ = merge(mouse.end$, touch.end$);
  }

  private findClosestValue(position: number) {

  }
}
