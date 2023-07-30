import { Locale } from "./constants";
import { GenderType } from "./gender";

export type Translatable = Record<Locale, string>;
export type GenderKey = Lowercase<GenderType>;
export type GenderTranslatable = Record<GenderKey, Translatable>;

export type ResourceKey = { href: string };
export type ResourceReference<T, K extends keyof T | undefined = undefined> = { key: ResourceKey } & {
  [key in keyof T as key extends K ? key : never]: T[key];
};

export type Payload<T extends Record<string, any>> = T & {
  _links: { self: { href: string } };
};
