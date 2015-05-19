import {InternCache} from 'cache/intern-cache';
import {Constructor} from 'core-types';
import {InternRecord} from 'intern-record';

export interface AbstractInternedObjectFactory<T> {
  get(...args: any[]): T;
}

export class InternedObjectFactory<T> implements AbstractInternedObjectFactory<T> {
  constructor(private Ctor: Constructor<T>,
              private internCache: InternCache<T>) {}

    /**
   * Get the interned object that was constructed with the supplied arguments
   */
  get(...args: any[]): T {
    var obj = this.internCache.get(args);

    if (!obj) {
      obj = this.create(args);
      this.internCache.set(obj, args);
    }

    return obj;
  }

  /**
   * Create a new object.
   */
  private create(args: any[]): T {
    var obj = Object.create(this.Ctor.prototype);
    var ctorReturnValue = this.Ctor.apply(obj, args);

    return ctorReturnValue ? ctorReturnValue : obj;
  }
}