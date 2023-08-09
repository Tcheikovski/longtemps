import { EmptyObject, Override, UnknownObject } from '@longtemps/core'

export namespace Api {
  export type Namespace = 'static' | 'dynamic' | 'profile'

  export interface Resource {
    id: number
  }

  export interface Link {
    href: string;
  }

  export interface Key {
    key: Link;
  }

  export type Ref<
    T extends Resource,
    K extends {} | Exclude<keyof T, 'id'> = never,
    U extends {} = {}
  > = Override<Key & Pick<T, K extends string ? K | 'id' : 'id'>, K extends string ? U : K>

  export type Document<T extends UnknownObject = UnknownObject, U extends UnknownObject = EmptyObject> = Override<T, U & { _links: Document.Links }>

  export namespace Document {
    export interface Links {
      self: Link
      [key: string]: Link
    }
  }

  export interface Media<T extends Media.AssetKey = Media.AssetKey> extends Resource {
    assets: Media.Asset<T>[]
  }

  export namespace Media {
    export type AssetKey = 'icon' | 'image' | 'avatar' | 'inset' | 'main' | 'main-raw' | 'zoom';

    export interface Asset<T extends AssetKey = AssetKey> {
      key: T
      value: string
      file_data_id: number
    }
  }

}
