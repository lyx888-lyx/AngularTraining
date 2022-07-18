import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SongSheet} from "../../../service/data-types/common.types";

@Component({
  selector: 'app-single-sheet',
  templateUrl: './single-sheet.component.html',
  styleUrls: ['./single-sheet.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleSheetComponent implements OnInit {
  @Input() sheets: SongSheet;
  @Output() onPlay = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  playSheet(id: number) {
    this.onPlay.emit(id);
  }
}
