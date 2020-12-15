import { createContext, useContext, useMemo } from "react"
import { action, computed, makeObservable, observable } from "mobx"
import { ILogicInterface, ILogicNode } from "@main/controllers"
import { SmartMap } from "smartmap"
import { NodeState, NODE_CONTENT_HEIGHT, NODE_HEIGHT } from "./use-node-state"
import { ComposerState, useParentComposerState } from "../Composer/use-composer-state"
import { useConstant } from "@utils/react"

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

  @computed get height() {
    return this.composer.dimensions?.height //- TOOLBAR HEIGHT??
  }

  @computed get maxHeight() {
    return this.height && Math.max(this.height, this.nodes.size * NODE_HEIGHT)
  }

  @computed get spacer() {
    const { height } = this
    if (height) {
      const { size } = this.nodes
      return (height - size * NODE_HEIGHT) / (size + 1)
    }
    return null
  }

  @computed get indexies() {
    return new Map(this.io.list.map((node, i) => [node, i]))
  }

  @action dispose() {
    this.nodes.dispose()
  }

  @action.bound editNode(node: ILogicNode) {
    this.isEdit = true
    this.nodeEdit = node
  }
}

export function useIOState(ioType: IOType) {
  const composer = useParentComposerState()
  // const state = useMemo(() => (ioType === "in" ? composer.inputs : composer.outputs), [composer, ioType])
  const state = useConstant(() => (ioType === "in" ? composer.inputs : composer.outputs))

  return state
}

export const IOContext = createContext({} as IOState)

export function useParentIOState() {
  return useContext(IOContext)
}
