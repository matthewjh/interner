define(["require", "exports"], function (require, exports) {
    var InternRecord = (function () {
        function InternRecord(intern, args) {
            this.intern = intern;
            this.args = args;
        }
        return InternRecord;
    })();
    exports.InternRecord = InternRecord;
});
