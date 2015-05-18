export interface InternedObjectFactory<T> {
  get(...args): T;
}

export interface Constructor<T> {
  (...args: any[]): T;
}
  
/**
 * InternedObjectFactory that uses dynamic code generation.
 */
export class JitInternedObjectFactory<T> implements InternedObjectFactory<T> {
  constructor(private Ctor: Constructor<T>) {}

  /**
   * Get the interned object that was constructed with the supplied arguments
   */
  get(...args: any[]): T {
    return this.create(args);
  }

  /**
   * Create a new object.
   * @type {[type]}
   */
  private create(args: any[]): T {
    var obj = Object.create(this.Ctor.prototype);
    var ctorReturnValue = this.Ctor.apply(obj, args);

    return ctorReturnValue ? ctorReturnValue : obj;
  }
}





