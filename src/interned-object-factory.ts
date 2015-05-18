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
    var conditionString = '';

    for (var i = 0; i < objArgs.length; i++) {
      conditionString += `args[${i}] === objArgs[${i}]`;

      if (i < objArgs.length - 1) {
        conditionString += '&&';
      }
    }

    var functionString: string;

    if (conditionString !== '') {
      functionString = `if (${conditionString}) return cachedObj;`;
    } else {
      functionString = 'return cachedObj;'
    }

    console.log(functionString);

    return new Function('cachedObj', 'objArgs', 'args', functionString).bind(null, obj, objArgs);
  }
}





