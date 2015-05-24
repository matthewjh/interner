define(["require", "exports"], function (require, exports) {
    var NodeWithLabeledLinks = (function () {
        function NodeWithLabeledLinks() {
            this.links = new Map();
        }
        NodeWithLabeledLinks.prototype.linkToNodeBy = function (node, linkLabel) {
            this.links.set(linkLabel, node);
        };
        NodeWithLabeledLinks.prototype.getChildBy = function (linkLabel) {
            // var a = performance.now();
            var child = this.links.get(linkLabel);
            // var b = performance.now();
            // console.log('perf: ', b - a);
            return child;
        };
        return NodeWithLabeledLinks;
    })();
    exports.NodeWithLabeledLinks = NodeWithLabeledLinks;
});
