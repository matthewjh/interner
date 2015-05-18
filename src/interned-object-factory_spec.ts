import {InternedObjectFactory, JitInternedObjectFactory} from 'interned-object-factory';

var returnValue = {};

class ExplicitReturnValueClass {
  constructor() {
    return returnValue;
  }
}

class ClassWithSimpleParameters {
  constructor(public x: number, public y: number) {}
}

class ClassWithComplexParameters {
  constructor(public x: ClassWithSimpleParameters, public y: ClassWithSimpleParameters) {}
}

describe('JitInternedObjectFactory', () => {
  var internedObjectFactory: JitInternedObjectFactory<ClassWithSimpleParameters>;

  beforeEach(() => {
    internedObjectFactory = new JitInternedObjectFactory(ClassWithSimpleParameters);
  });

  describe('class with simple parameters', () => {
    var internedObjectFactory: JitInternedObjectFactory<ClassWithSimpleParameters>;

    beforeEach(() => {
      internedObjectFactory = new JitInternedObjectFactory(ClassWithSimpleParameters);
    });

    it('should return the same object when .get is called with the same parameters', () => {
      var a1: ClassWithSimpleParameters = internedObjectFactory.get(4, 5),
          a2: ClassWithSimpleParameters = internedObjectFactory.get(4, 5);

      expect(a1).toBe(a2);
    });

    it('should return a different object when .get is called with different parameters', () => {
      var a1: ClassWithSimpleParameters = internedObjectFactory.get(4, 5),
          a2: ClassWithSimpleParameters = internedObjectFactory.get(5, 5);

      expect(a1).not.toBe(a2);
    });

    it('should return an object with the correct properties as assigned by the ctor when .get is called', () => {
      var a: ClassWithSimpleParameters = internedObjectFactory.get(10, 11);

      expect(a.x).toBe(10);
      expect(a.y).toBe(11);
    });
  });

   describe('class with complex parameters', () => {
    var internedObjectFactory: JitInternedObjectFactory<ClassWithComplexParameters>,
        param1: ClassWithSimpleParameters,
        param2: ClassWithSimpleParameters;

    beforeEach(() => {
      internedObjectFactory = new JitInternedObjectFactory(ClassWithComplexParameters);
      param1 = new ClassWithSimpleParameters(5, 5);
      param2 = new ClassWithSimpleParameters(10, 5);
    });

    it('should return the same object when .get is called with the same parameters', () => {
      var a1 = internedObjectFactory.get(param1, param2),
          a2 = internedObjectFactory.get(param1, param2);

      expect(a1).toBe(a2);
    });

    it('should return a different object when .get is called with different parameters', () => {
      var a1 = internedObjectFactory.get(param1, param1),
          a2 = internedObjectFactory.get(param2, param2);

      expect(a1).not.toBe(a2);
    });

    it('should return an object with the correct properties as assigned by the ctor when .get is called', () => {
      var a = internedObjectFactory.get(param1, param2);

      expect(a.x).toBe(param1);
      expect(a.y).toBe(param2);
    });
  });

  it('should return the correct object if an explicit value is returned from the constructor when .get is called', () => {
    var internedObjectFactory = new JitInternedObjectFactory(ExplicitReturnValueClass);

    expect(internedObjectFactory.get()).toBe(returnValue);
  });
});