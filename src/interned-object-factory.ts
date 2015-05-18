import {Constructor} from 'core-types';

export interface InternedObjectFactory<T> {
  get(...args: any[]): T;
}
  
/**
 * InternedObjectFactory that uses dynamic code generation.
 */
export class JitInternedObjectFactory<T> implements InternedObjectFactory<T> {
  private checkFunctions: Array<(args: any[]) => T>;

  constructor(private Ctor: Constructor<T>) {
    this.checkFunctions = [];
  }

  /**
   * Get the interned object that was constructed with the supplied arguments
   */
  get(...args: any[]): T {

    for (var fn of this.checkFunctions) {
      var obj = fn(args);

      if (obj) {
        return obj;
      }
    }

    var obj = this.create(args);

    this.recordObjectCreation(obj, args);

    return obj;
  }

  /**
   * Create a new object.
   */
  private create(args: any[]): T {
    var obj = Object.create(this.Ctor.prototype);
    var ctorReturnValue = this.Ctor.apply(obj, args);

    return ctorReturnValue ? ctorReturnValue : obj;
  }

  private recordObjectCreation(obj: T, args: any[]) {
    this.checkFunctions.push(this.getCheckFunction(obj, args));
  }

  private getCheckFunction(obj: T, objArgs: any[]): (args: any[]) => T {
    const CACHED_OBJ = 'cachedObj';
    const ARGS = 'args';
    const CACHED_OBJ_ARGS = 'cachedObjArgs';
    var conditionString = '';
    var functionString: string;

    for (var i = 0; i < objArgs.length; i++) {
      conditionString += `${ARGS}[${i}] === ${CACHED_OBJ_ARGS}[${i}]`;

      if (i < objArgs.length - 1) {
        conditionString += '&&';
      }
    }

    if (conditionString !== '') {
      functionString = `if (${conditionString}) return ${CACHED_OBJ};`;
    } else {
      functionString = `return ${CACHED_OBJ};`;
    }

    console.log(functionString);

    return new Function(CACHED_OBJ, CACHED_OBJ_ARGS, ARGS, functionString).bind(undefined, obj, objArgs);
  }
}





