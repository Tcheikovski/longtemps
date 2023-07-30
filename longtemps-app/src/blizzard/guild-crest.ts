import { Media, MediaAsset } from "./media";
import { ResourceReference } from "./util";

export interface GuildCrestColor {
  id: number;
  rgba: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
}

export interface GuildCrestEmblem {
  id: number;
  media: ResourceReference<GuildCrestEmblemMedia, "id">;
  color: GuildCrestColor;
}

export interface GuildCrestBorder {
  id: number;
  media: ResourceReference<GuildCrestBorderMedia, "id">;
  color: GuildCrestColor;
}

export interface GuildCrestBackground {
  color: GuildCrestColor;
}

export interface GuildCrestBorderMedia extends Media {
  assets: [MediaAsset<"image">];
}

export interface GuildCrestEmblemMedia extends Media {
  assets: [MediaAsset<"image">];
}
