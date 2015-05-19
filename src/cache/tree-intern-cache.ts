import {InternCache} from 'cache/intern-cache';
import {NodeWithLabeledLinks} from 'tree';

export class TreeInternCache<T> implements InternCache<T> {
  private rootNode: NodeWithLabeledLinks<any, T>;

  constructor() {
    this.rootNode = new NodeWithLabeledLinks();
  }

  get(args: Array<any>): T {
    var node = this.getNodeByPath(args);

    return node && node.value;
  }

  set(instance: T, args: Array<any>) {
    this.setNodeValueAtPath(instance, args);
  }

  private getNodeByPath(labels: Array<any>): NodeWithLabeledLinks<any, T> {
    var node = this.rootNode;

    for (var i = 0; i < labels.length && node; i++) {
      node = node.getChildBy(labels[i]);
    }

    if (i === labels.length) {
      return node;
    } else {
      return undefined;
    }
  }

  private setNodeValueAtPath(value: T, labels: Array<any>): NodeWithLabeledLinks<any, T> {
    var node = this.rootNode;
    var nextNode: NodeWithLabeledLinks<any, T>;

    for (var label of labels) {
      nextNode = node.getChildBy(label);

      if (!nextNode) {
        nextNode = new NodeWithLabeledLinks();
        node.linkToNodeBy(nextNode, label);
      }

      node = nextNode;
    }

    node.value = value;
  }
}