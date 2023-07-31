export type AnyObject = {}
export type UnknownObject = { [key in string]: unknown }
export type DeepPartial<T> = { [key in keyof T]?: {} extends T[key] ? DeepPartial<T> : T[key] }

export type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K
} extends { [_ in keyof T]: infer U } ? {} extends U ? never : U : never

export type Override<T1, T2> = Omit<T1, keyof Omit<T2, keyof KnownKeys<T2>>> & T2;
export type KeyOf<T extends AnyObject> = keyof T
export type ValueOf<T extends AnyObject> = T[keyof T]
