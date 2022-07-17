// 返回数据类型
// 轮播图
export type Banner = {
  targetId: number,
  url: string,
  imageUrl: string
}

// 热门推荐
export type HotTag = {
  id: number,
  name: string,
  position: number
}

// 热门歌单
export type SongSheet = {
  id: number,
  name: string,
  picUrl: string,
  playCount: number
}

// 常驻歌手
export type Singer = {
  picId: number,
  name: string,
  picUrl: string,
  albumSize: number
}
