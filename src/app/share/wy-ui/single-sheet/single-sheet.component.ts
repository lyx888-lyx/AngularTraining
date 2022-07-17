import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {SongSheet} from "../../../service/data-types/common.types";

@Component({
  selector: 'app-single-sheet',
  templateUrl: './single-sheet.component.html',
  styleUrls: ['./single-sheet.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleSheetComponent implements OnInit {
  @Input() sheets: SongSheet;
  constructor() { }

  ngOnInit() {
  }

}
