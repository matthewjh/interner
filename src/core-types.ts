export interface Constructor<T> {
  new<_>(...args: Array<any>): T;
  name?: string;
} 