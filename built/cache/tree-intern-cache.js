define(["require", "exports", 'tree'], function (require, exports, tree_1) {
    var TreeInternCache = (function () {
        function TreeInternCache() {
            this.rootNode = new tree_1.NodeWithLabeledLinks();
        }
        TreeInternCache.prototype.get = function (args) {
            var node = this.getNodeByPath(args);
            return node && node.value;
        };
        TreeInternCache.prototype.set = function (instance, args) {
            this.setNodeValueAtPath(instance, args);
        };
        TreeInternCache.prototype.getNodeByPath = function (labels) {
            var node = this.rootNode;
            for (var i = 0; i < labels.length && node; i++) {
                node = node.getChildBy(labels[i]);
            }
            if (i === labels.length) {
                return node;
            }
            else {
                return undefined;
            }
        };
        TreeInternCache.prototype.setNodeValueAtPath = function (value, labels) {
            var node = this.rootNode;
            var nextNode;
            for (var _i = 0; _i < labels.length; _i++) {
                var label = labels[_i];
                nextNode = node.getChildBy(label);
                if (!nextNode) {
                    nextNode = new tree_1.NodeWithLabeledLinks();
                    node.linkToNodeBy(nextNode, label);
                }
                node = nextNode;
            }
            node.value = value;
        };
        return TreeInternCache;
    })();
    exports.TreeInternCache = TreeInternCache;
});
