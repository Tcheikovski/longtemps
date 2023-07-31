export type MediaAssetKey = 'icon' | 'image' | 'avatar' | 'inset' | 'main-raw';

export interface MediaAsset<T extends MediaAssetKey = MediaAssetKey> {
  key: T;
  value: string;
  file_data_id: number;
}

export interface Media {
  id: number;
  assets: MediaAsset[];
}
