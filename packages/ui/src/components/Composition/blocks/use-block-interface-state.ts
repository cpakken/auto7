import { SmartMap } from "smartmap"
import { ILogicInterfaceModel, ILogicNodeModel } from "@main/controllers"
import { IOType } from "./BlockContent"
import { BlockState } from "./use-block-state"
import { BlockInNodeState, BlockNodeState, BlockOutNodeState } from "./use-block-node-state"
import { computed, makeObservable } from "mobx"

export abstract class BlockInterfaceState {
  abstract readonly ioType: IOType
  io: ILogicInterfaceModel
  block: BlockState

  //TODO make into weakmap since will not be added or deleted
  abstract store: SmartMap<string, ILogicNodeModel, BlockNodeState>

  constructor(io: ILogicInterfaceModel, block: BlockState) {
    makeObservable(this)
    this.io = io
    this.block = block
  }

  @computed get list(): BlockNodeState[] {
    return this.io.list.map(({ _id }) => this.store.get(_id)!)
  }

  @computed get indexies() {
    return new WeakMap(this.list.map((node, i) => [node, i]))
  }
}

export class BlockInInterfaceState extends BlockInterfaceState {
  ioType = "in" as const
  store: SmartMap<string, ILogicNodeModel, BlockInNodeState>

  constructor(io: ILogicInterfaceModel, block: BlockState) {
    super(io, block)
    this.store = new SmartMap(io.store, (input) => new BlockInNodeState(input, this), { eager: true })
  }
}

export class BlockOutInterfaceState extends BlockInterfaceState {
  ioType = "out" as const
  store: SmartMap<string, ILogicNodeModel, BlockOutNodeState>

  constructor(io: ILogicInterfaceModel, block: BlockState) {
    super(io, block)
    this.store = new SmartMap(io.store, (output) => new BlockOutNodeState(output, this), { eager: true })
  }
}
