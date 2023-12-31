export type AnyFunction = (...args: any[]) => any;
export type AnyConstructor = abstract new (...args: any[]) => any;

export type AnyObject = { [key in PropertyKey]: any };
export type UnknownObject = { [key in PropertyKey]: unknown };
export type EmptyObject = { [key in PropertyKey]: never };

export type DeepPartial<T> = { [key in keyof T]?: T[key] extends AnyObject ? DeepPartial<T[key]> : T[key] };

export type Required<T> = T extends {} ? { [key in keyof T]-?: T[key] & {} } : never;
export type DeepRequired<T> = T extends {}
  ? { [key in keyof T]-?: T[key] & {} extends AnyObject ? DeepRequired<T[key]> : T[key] & {} }
  : never;

export type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K;
} extends { [_ in keyof T]: infer U }
  ? {} extends U
    ? never
    : U
  : never;
export type Override<T1, T2> = Omit<T1, keyof Omit<T2, keyof KnownKeys<T2>>> & T2;

export type KeyOf<T extends UnknownObject> = keyof T;
export type ValueOf<T extends UnknownObject> = T[keyof T];

export type FunctionSignatureOf<T extends AnyFunction> = (...args: Parameters<T>) => ReturnType<T>;
export type ConstructorSignatureOf<T extends AnyConstructor> = (...args: ConstructorParameters<T>) => InstanceType<T>;

export interface ClassConstructor<T = AnyObject, U extends any[] = any[]> {
  new (...args: U): T;
}
