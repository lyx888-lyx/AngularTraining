import {Inject, Injectable} from '@angular/core';
import {API_CONFIG, ServiceModule} from "./service.module";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Song, SongSheet} from "./data-types/common.types";
import {map, pluck, switchMap} from "rxjs/operators";
import {SongService} from "./song.service";

@Injectable({
  providedIn: ServiceModule
})

export class SheetService {
  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private uri: string,
    private songService: SongService
  ) {
  }

  // 获取歌单详情
  getSongSheetDetail(id: number): Observable<SongSheet> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get(this.uri + 'playlist/detail', { params })
      .pipe(map((res: { playlist: SongSheet }) => res.playlist));
  }


  playSheet(id: number): Observable<Song[]> {
    // @ts-ignore
    return this.getSongSheetDetail(id)
      // @ts-ignore
      .pipe(pluck('tracks'), switchMap(tracks => this.songService.getSongList(tracks)));
  }

}
