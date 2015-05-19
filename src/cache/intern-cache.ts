export interface InternCache<T> {
  get(args: Array<any>): T;
  set(instance: T, args: Array<any>): void;
}
