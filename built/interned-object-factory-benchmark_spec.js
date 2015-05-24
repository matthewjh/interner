define(["require", "exports", 'interned-object-factory', 'cache/jit-intern-cache', 'cache/tree-intern-cache'], function (require, exports, interned_object_factory_1, jit_intern_cache_1, tree_intern_cache_1) {
    var TIMES_TO_RUN = 100;
    var ClassWithSimpleParameters = (function () {
        function ClassWithSimpleParameters(a1, a2, a3, a4) {
            this.a1 = a1;
            this.a2 = a2;
            this.a3 = a3;
            this.a4 = a4;
        }
        return ClassWithSimpleParameters;
    })();
    function runPerformanceBenchmark(fn) {
        it('', function () {
            var totalDuration = 0;
            console.log('-------------');
            for (var i = 0; i < TIMES_TO_RUN; i++) {
                var startTime = performance.now();
                fn();
                var endTime = performance.now();
                var diff = endTime - startTime;
                totalDuration += diff;
            }
            console.log('Average duration: ' + totalDuration / TIMES_TO_RUN);
            console.log('-------------');
        });
    }
    [
        jit_intern_cache_1.JitInternCache,
        tree_intern_cache_1.TreeInternCache
    ].forEach(function (InternCacheImpl) {
        xdescribe("InternedObjectFactory with " + InternCacheImpl.name + ": benchmark of creating 100 interns and then fetching them 1000 times each", function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
            var internedObjectFactory;
            var internCache;
            beforeEach(function () {
                internCache = new InternCacheImpl();
                internedObjectFactory = new interned_object_factory_1.InternedObjectFactory(ClassWithSimpleParameters, internCache);
            });
            runPerformanceBenchmark(function () {
                for (var i = 0; i < 100; i++) {
                    internedObjectFactory.get(i, i, i, i, i);
                }
                for (i = 0; i < 100; i++) {
                    for (var j = 0; j < 1000; j++) {
                        internedObjectFactory.get(i, i, i, i, i);
                    }
                }
            });
        });
    });
    xdescribe('benchmark of creating 100 Map entries and then fetching them 1000 times each', function () {
        var map;
        beforeEach(function () {
            map = new Map();
        });
        runPerformanceBenchmark(function () {
            for (var i = 0; i < 100; i++) {
                map.set(i, {});
            }
            for (i = 0; i < 100; i++) {
                for (var j = 0; j < 1000; j++) {
                    map.get(i);
                }
            }
        });
    });
});
