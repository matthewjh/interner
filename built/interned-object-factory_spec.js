define(["require", "exports", 'interned-object-factory', 'cache/jit-intern-cache', 'cache/tree-intern-cache'], function (require, exports, interned_object_factory_1, jit_intern_cache_1, tree_intern_cache_1) {
    var returnValue = {};
    var ExplicitReturnValueClass = (function () {
        function ExplicitReturnValueClass() {
            return returnValue;
        }
        return ExplicitReturnValueClass;
    })();
    var ClassWithSimpleParameters = (function () {
        function ClassWithSimpleParameters(x, y) {
            this.x = x;
            this.y = y;
        }
        return ClassWithSimpleParameters;
    })();
    var ClassWithComplexParameters = (function () {
        function ClassWithComplexParameters(x, y) {
            this.x = x;
            this.y = y;
        }
        return ClassWithComplexParameters;
    })();
    [
        jit_intern_cache_1.JitInternCache,
        tree_intern_cache_1.TreeInternCache
    ].forEach(function (InternCacheImpl) {
        describe("InternedObjectFactory with " + InternCacheImpl.name, function () {
            var internedObjectFactory;
            var internCache;
            beforeEach(function () {
                internCache = new InternCacheImpl();
                internedObjectFactory = new interned_object_factory_1.InternedObjectFactory(ClassWithSimpleParameters, internCache);
            });
            describe('class with simple parameters', function () {
                var internedObjectFactory;
                var internCache;
                beforeEach(function () {
                    internCache = new InternCacheImpl();
                    internedObjectFactory = new interned_object_factory_1.InternedObjectFactory(ClassWithSimpleParameters, internCache);
                });
                it('should return the same object when .get is called with the same parameters', function () {
                    var a1 = internedObjectFactory.get(4, 5), a2 = internedObjectFactory.get(4, 5);
                    expect(a1).toBe(a2);
                });
                it('should return a different object when .get is called with different parameters', function () {
                    var a1 = internedObjectFactory.get(4, 5), a2 = internedObjectFactory.get(5, 5);
                    expect(a1).not.toBe(a2);
                });
                it('should return an object with the correct properties as assigned by the ctor when .get is called', function () {
                    var a = internedObjectFactory.get(10, 11);
                    expect(a.x).toBe(10);
                    expect(a.y).toBe(11);
                });
            });
            describe('class with complex parameters', function () {
                var internedObjectFactory, internCache, param1, param2;
                beforeEach(function () {
                    internCache = new InternCacheImpl();
                    internedObjectFactory = new interned_object_factory_1.InternedObjectFactory(ClassWithComplexParameters, internCache);
                    param1 = new ClassWithSimpleParameters(5, 5);
                    param2 = new ClassWithSimpleParameters(10, 5);
                });
                it('should return the same object when .get is called with the same parameters', function () {
                    var a1 = internedObjectFactory.get(param1, param2), a2 = internedObjectFactory.get(param1, param2);
                    expect(a1).toBe(a2);
                });
                it('should return a different object when .get is called with different parameters', function () {
                    var a1 = internedObjectFactory.get(param1, param1), a2 = internedObjectFactory.get(param2, param2);
                    expect(a1).not.toBe(a2);
                });
                it('should return an object with the correct properties as assigned by the ctor when .get is called', function () {
                    var a = internedObjectFactory.get(param1, param2);
                    expect(a.x).toBe(param1);
                    expect(a.y).toBe(param2);
                });
            });
            it('should return the correct object if an explicit value is returned from the constructor when .get is called', function () {
                var internCache = new InternCacheImpl();
                var internedObjectFactory = new interned_object_factory_1.InternedObjectFactory(ExplicitReturnValueClass, internCache);
                expect(internedObjectFactory.get()).toBe(returnValue);
            });
        });
    });
});
