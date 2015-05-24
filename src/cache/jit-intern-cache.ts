import {InternCache} from 'cache/intern-cache';
import {InternRecord} from 'intern-record';

const INTERNS = 'interns';
const ARGS = 'args';
const INTERNS_ARGS = 'internsArgs';


export class JitInternCache<T> implements InternCache<T> {
  private getIntern: (args: Array<any>) => T;
  private internRecords: Array<InternRecord<T>>;

  constructor() {
    this.getIntern = function () { return null; };
    this.internRecords = [];
  }

  set(obj: T, args: Array<any>): void {
    var internRecord = new InternRecord(obj, args);

    this.internRecords.push(internRecord);
    this.getIntern = this.generateGetInternFunction();
  }

  get(args: Array<any>): T {
    return this.getIntern(args);
  }

  private generateGetInternFunction(): (args: Array<any>) => T {
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