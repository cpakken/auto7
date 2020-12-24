import { action, computed, makeObservable, observable } from "mobx"
import { ILogicInterface, ILogicNode } from "@main/controllers"
import { SmartMap } from "smartmap"
import { NodeState, NODE_HEIGHT } from "./use-node-state"
import { ComposerState } from "../Composer/use-composer-state"

export type IOType = "in" | "out"

// @refresh reset
export class IOState {
  ioType: IOType
  io: ILogicInterface
  composer: ComposerState

  nodes: SmartMap<string, ILogicNode, NodeState>

  @observable isEdit = false
  @observable nodeEdit: ILogicNode | null = null

  constructor(ioType: IOType, io: ILogicInterface, composer: ComposerState) {
    makeObservable(this)
    this.composer = composer
    this.ioType = ioType
    this.io = io

    this.nodes = new SmartMap(io.store, (node) => new NodeState(node, this), { eager: true })
  }

  @computed get list() {
    return this.io.list.map(({ _id }) => this.nodes.get(_id)!)
  }

  @computed get height() {
    return this.composer.dimensions.height //- TOOLBAR HEIGHT??
  }

  @computed get maxHeight() {
    return this.height && Math.max(this.height, this.nodes.size * NODE_HEIGHT)
  }

  @computed get spacer() {
    const { size } = this.nodes
    return (this.maxHeight - size * NODE_HEIGHT) / (size + 1)
  }

  @computed get indexies(): WeakMap<NodeState, number> {
    return new WeakMap(this.list.map((node, i) => [node, i]))
  }

  @action dispose() {
    this.nodes.dispose()
  }

  @action.bound editNode(node: ILogicNode) {
    this.isEdit = true
    this.nodeEdit = node
  }
}

// //TODO no need for this -> just input directly into component props
// export function useIOState(ioType: IOType) {
//   const composer = useParentComposerState()
//   const state = useConstant(() => (ioType === "in" ? composer.inputs : composer.outputs))

//   return state
// }

// export const IOContext = createContext({} as IOState)

// export function useParentIOState() {
//   return useContext(IOContext)
// }
