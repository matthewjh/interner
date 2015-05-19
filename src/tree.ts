export class NodeWithLabeledLinks<TLabel, TValue> {
  public value: TValue;
  private links: Map<TLabel, NodeWithLabeledLinks<any, any>>;

  constructor() {
    this.links = new Map();
  }

  linkToNodeBy(node: NodeWithLabeledLinks<any, any>, linkLabel: TLabel): void {
    this.links.set(linkLabel, node);
  }

  getChildBy(linkLabel: TLabel): NodeWithLabeledLinks<any, any> {
    return this.links.get(linkLabel);
  }
}