define(["require", "exports", 'intern-record'], function (require, exports, intern_record_1) {
    var INTERNS = 'interns';
    var ARGS = 'args';
    var INTERNS_ARGS = 'internsArgs';
    var JitInternCache = (function () {
        function JitInternCache() {
            this.getIntern = function () { return null; };
            this.internRecords = [];
        }
        JitInternCache.prototype.set = function (obj, args) {
            var internRecord = new intern_record_1.InternRecord(obj, args);
            this.internRecords.push(internRecord);
            this.getIntern = this.generateGetInternFunction();
        };
        JitInternCache.prototype.get = function (args) {
            return this.getIntern(args);
        };
        JitInternCache.prototype.generateGetInternFunction = function () {
            var functionString = '';
            var interns = [];
            var internsArgs = [];
            var internRecordIndex = 0;
            for (var _i = 0, _a = this.internRecords; _i < _a.length; _i++) {
                var internRecord = _a[_i];
                var ifString;
                var conditionString = '';
                var internArgs = internRecord.args;
                var intern = internRecord.intern;
                interns.push(intern);
                internsArgs.push(internArgs);
                var argIndex = 0;
                for (var _b = 0; _b < internArgs.length; _b++) {
                    var arg = internArgs[_b];
                    conditionString += ARGS + "[" + argIndex + "] === " + INTERNS_ARGS + "[" + internRecordIndex + "][" + argIndex + "]";
                    if (argIndex < internArgs.length - 1) {
                        conditionString += '&&';
                    }
                    argIndex++;
                }
                if (conditionString !== '') {
                    ifString = "if (" + conditionString + ") return " + INTERNS + "[" + internRecordIndex + "];";
                }
                else {
                    ifString = '';
                }
                functionString += ifString;
                internRecordIndex++;
            }
            return new Function(INTERNS, INTERNS_ARGS, ARGS, functionString).bind(undefined, interns, internsArgs);
        };
        return JitInternCache;
    })();
    exports.JitInternCache = JitInternCache;
});
