export interface Constructor<T> {
  new<_>(...args: Array<any>): T;

  /** The name property is present in ES6 */
  name?: string;
} 