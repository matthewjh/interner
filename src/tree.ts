export class NodeWithLabeledLinks<TLabel, TValue> {
  public value: TValue;
  private links: Map<TLabel, NodeWithLabeledLinks<any, any>>;

  constructor() {
    this.links = new Map<TLabel, NodeWithLabeledLinks<any, any>>();
  }

  linkToNodeBy(node: NodeWithLabeledLinks<any, any>, linkLabel: TLabel): void {
    this.links.set(linkLabel, node);
  }

  getChildBy(linkLabel: TLabel): NodeWithLabeledLinks<any, any> {
    // var a = performance.now();
    var child = this.links.get(linkLabel);
    // var b = performance.now();
    // console.log('perf: ', b - a);

    return child;
  }
}