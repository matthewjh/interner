define(["require", "exports"], function (require, exports) {
    var InternedObjectFactory = (function () {
        function InternedObjectFactory(Ctor, internCache) {
            this.Ctor = Ctor;
            this.internCache = internCache;
        }
        /**
       * Get the interned object that was constructed with the supplied arguments
       */
        InternedObjectFactory.prototype.get = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var obj = this.internCache.get(args);
            if (!obj) {
                obj = this.create(args);
                this.internCache.set(obj, args);
            }
            return obj;
        };
        /**
         * Create a new object.
         */
        InternedObjectFactory.prototype.create = function (args) {
            var obj = Object.create(this.Ctor.prototype);
            var ctorReturnValue = this.Ctor.apply(obj, args);
            return ctorReturnValue ? ctorReturnValue : obj;
        };
        return InternedObjectFactory;
    })();
    exports.InternedObjectFactory = InternedObjectFactory;
});
