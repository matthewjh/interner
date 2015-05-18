define(["require", "exports"], function (require, exports) {
    var A = (function () {
        function A() {
        }
        A.prototype.get = function () {
            return 5;
        };
        return A;
    })();
    exports.A = A;
});
