import {InternedObjectFactory} from 'interned-object-factory';
import {JitInternCache} from 'cache/jit-intern-cache';
import {TreeInternCache} from 'cache/tree-intern-cache';
import {InternCache} from 'cache/intern-cache';

const TIMES_TO_RUN = 100;

class ClassWithSimpleParameters {
  constructor(public a1: number, 
              public a2: number, 
              public a3: number,
              public a4: number) {}
}

function runPerformanceBenchmark(fn: Function) {
  it('', () => {
    var totalDuration = 0;

    console.log('-------------')

    for (var i = 0; i < TIMES_TO_RUN; i++) {
      var startTime = performance.now();

      fn();

      var endTime = performance.now();
      var diff = endTime - startTime;
      totalDuration += diff;
    }

    console.log('Average duration: ' + totalDuration / TIMES_TO_RUN);
    console.log('-------------')
  });
}

[
  JitInternCache,
  TreeInternCache
].forEach((InternCacheImpl) => {

  describe(`InternedObjectFactory with ${InternCacheImpl.name}: benchmark of creating 100 interns and then fetching them 1000 times each`, () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

    var internedObjectFactory: InternedObjectFactory<ClassWithSimpleParameters>;
    var internCache: InternCache<ClassWithSimpleParameters>;

    beforeEach(() => {
      internCache = new InternCacheImpl<ClassWithSimpleParameters>();
      internedObjectFactory = new InternedObjectFactory(ClassWithSimpleParameters, internCache);
    });

    runPerformanceBenchmark(() => {
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

describe('benchmark of creating 100 Map entries and then fetching them 1000 times each', () => {
  var map: Map<number, Object>;

  beforeEach(() => {
    map = new Map();
  });

  runPerformanceBenchmark(() => {
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