import {InternedObjectFactory, JitInternedObjectFactory} from 'interned-object-factory';

class A {
  constructor(public x: number, public y: number) {}
}

describe('JitInternedObjectFactory', () => {
  var internedObjectFactory = new JitInternedObjectFactory(A);

  it('should return the same object when .get is called with the same parameters', () => {
    var a1: A = internedObjectFactory.get(4, 5),
        a2: A = internedObjectFactory.get(4, 5);

    expect(a1).toBe(a2);
  });

  it('should return a different object when .get is called with different parameters', () => {
    var a1: A = internedObjectFactory.get(4, 5),
        a2: A = internedObjectFactory.get(5, 5);

    expect(a1).not.toBe(a2);
  });

  it('should return an object with the correct properties as assigned by the ctor', () => {
    var a: A = internedObjectFactory.get(10, 11);

    expect(a.x).toBe(10);
    expect(a.y).toBe(11);
  });
});