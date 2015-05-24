export interface Constructor<T> {
  new(...args: Array<any>): T;
  name: string;
} 