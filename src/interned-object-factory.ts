export interface InternedObjectFactory<T> {
  get(...args): T;
}

export interface Constructor<T> {
  (...args: any[]): T;
}
  
export class JitInternedObjectFactory<T> implements InternedObjectFactory<T> {
  constructor(private Ctor: Constructor<T>) {}

  get(...args: any[]): T {
    return this.create(args);
  }

  create(args: any[]): T {
    var obj = Object.create(this.Ctor.prototype);

    this.Ctor.apply(obj, args);

    return obj;
  }
}





