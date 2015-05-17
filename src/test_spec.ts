import {A} from 'test';

describe('test', () => {
  it('should return 5', () => {
    var a = new A();

    expect(a.get()).toEqual(5);
  });
});