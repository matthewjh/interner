import {Constructor} from 'core-types';
import {InternRecord} from 'intern-record';

export interface InternedObjectFactory<T> {
  get(...args: any[]): T;
}
  
/**
 * InternedObjectFactory that uses dynamic code generation.
 */
export class JitInternedObjectFactory<T> implements InternedObjectFactory<T> {
  private getIntern: (args: any[]) => T;
  private internRecords: Array<InternRecord<T>>;

  constructor(private Ctor: Constructor<T>) {
    this.getIntern = function () { return null; };
    this.internRecords = [];
  }

  /**
   * Get the interned object that was constructed with the supplied arguments
   */
  get(...args: any[]): T {
    var obj = this.getIntern(args);

    if (!obj) {
      obj = this.create(args);
      this.recordObjectCreation(obj, args);
    }

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
    var internRecord = new InternRecord(obj, args);

    this.internRecords.push(internRecord);
    this.getIntern = this.generateGetInternFunction();
  }

  private generateGetInternFunction(): (args: any[]) => T {
    const INTERNS = 'interns';
    const ARGS = 'args';
    const INTERNS_ARGS = 'internsArgs';
    var functionString = '';
    var interns: Array<T> = [];
    var internsArgs: Array<Array<any>> = [];

    var internRecordIndex = 0;
    for (var internRecord of this.internRecords) {
      var ifString: string;
      var conditionString = '';
      var internArgs = internRecord.args;
      var intern = internRecord.intern;

      interns.push(intern);
      internsArgs.push(internArgs);

      var argIndex = 0;
      for (var arg of internArgs) {
        conditionString += `${ARGS}[${argIndex}] === ${INTERNS_ARGS}[${internRecordIndex}][${argIndex}]`;

        if (argIndex < internArgs.length - 1) {
          conditionString += '&&';
        }

        argIndex++;
      }

      if (conditionString !== '') {
        ifString = `if (${conditionString}) return ${INTERNS}[${internRecordIndex}];`;
      } else {
        ifString = '';
      }

      functionString += ifString;

      internRecordIndex++;
    }

    return new Function(INTERNS, INTERNS_ARGS, ARGS, functionString).bind(undefined, interns, internsArgs);
  }
}


