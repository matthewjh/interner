import {InternedObjectFactory, JitInternedObjectFactory} from 'interned-object-factory';

class ClassWithSimpleParameters {
  constructor(public x: number, public y: number) {}
}

class ClassWithComplexParameters {
  constructor(public x: ClassWithSimpleParameters, public y: ClassWithSimpleParameters) {}
}

describe('JitInternedObjectFactory', () => {
  var internedObjectFactory = new JitInternedObjectFactory(ClassWithSimpleParameters);

  describe('class with simple parameters', () => {
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
    var param1,
        param2;

    beforeEach(() => {
      internedObjectFactory = new JitInternedObjectFactory(ClassWithComplexParameters);
      param1 = new ClassWithSimpleParameters(5, 5);
      param2 = new ClassWithSimpleParameters(10, 5);
    });

    it('should return the same object when .get is called with the same parameters', () => {
      var a1: ClassWithComplexParameters = internedObjectFactory.get(param1, param2),
          a2: ClassWithComplexParameters = internedObjectFactory.get(param1, param2);

      expect(a1).toBe(a2);
    });

    it('should return a different object when .get is called with different parameters', () => {
      var a1: ClassWithComplexParameters = internedObjectFactory.get(param1, param1),
          a2: ClassWithComplexParameters = internedObjectFactory.get(param2, param2);

      expect(a1).not.toBe(a2);
    });

    it('should return an object with the correct properties as assigned by the ctor when .get is called', () => {
      var a: ClassWithComplexParameters = internedObjectFactory.get(param1, param2);

      expect(a.x).toBe(param1);
      expect(a.y).toBe(param2);
    });
  });

  it('should return the correct object if an explicit value is returned from the constructor when .get is called', () => {
    var returnValue = {};

    class ExplicitReturnValueClass {
      constructor() {
        return returnValue;
      }
    }

    internedObjectFactory = new JitInternedObjectFactory(ExplicitReturnValueClass);

    expect(internedObjectFactory.get()).toBe(returnValue);
  });
});