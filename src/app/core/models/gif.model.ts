export interface Gif {
  id: string;
  title: string;
  url: string;
  images: GifImages;
  username?: string;
  rating?: string;
  import_datetime?: string;
  trending_datetime?: string;
}

export interface GifImages {
  original: GifImage;
  downsized?: GifImage;
  fixed_height?: GifImage;
  fixed_width?: GifImage;
  preview_gif?: GifImage;
}

export interface GifImage {
  url: string;
  width: string;
  height: string;
  size?: string;
}

export interface GiphyResponse {
  data: Gif[];
  pagination: Pagination;
  meta: Meta;
}

export interface GiphySingleResponse {
  data: Gif;
  meta: Meta;
}

export interface Pagination {
  total_count: number;
  count: number;
  offset: number;
}

export interface Meta {
  status: number;
  msg: string;
  response_id: string;
}

