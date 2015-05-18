import {InternedObjectFactory, JitInternedObjectFactory} from 'interned-object-factory';

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

fdescribe('benchmark of creating 100 interns and then fetching them 1000 times each', () => {
  var internedObjectFactory: JitInternedObjectFactory<ClassWithSimpleParameters>;

  beforeEach(() => {
    internedObjectFactory = new JitInternedObjectFactory(ClassWithSimpleParameters);
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

fdescribe('benchmark of creating 100 Map entries and then fetching them 1000 times each', () => {
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
        map.get(i)
      }
    }
  });
});