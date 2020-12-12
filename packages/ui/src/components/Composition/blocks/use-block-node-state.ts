import { ILogicNodeModel } from "@main/controllers"

export class BlockNodeState {
  node: ILogicNodeModel

  constructor(node: ILogicNodeModel) {
    this.node = node
  }
}
