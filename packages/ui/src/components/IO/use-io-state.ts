import { createContext, useContext, useMemo } from "react"
import { action, makeObservable, observable } from "mobx"
import { ILogicInterface, ILogicNode } from "@main/controllers"
import { SmartMap } from "smartmap"
import { NodeState } from "./use-node-state"
import { ComposerState, useParentComposerState } from "../Composer/use-composer-state"

export type IOType = "in" | "out"

export class IOState {
  ioType: IOType
  io: ILogicInterface
  composer: ComposerState | undefined

  nodes: SmartMap<string, ILogicNode, NodeState>

  @observable isEdit = false
  @observable nodeEdit: ILogicNode | null = null

  constructor(ioType: IOType, io: ILogicInterface, composer?: ComposerState) {
    makeObservable(this)
    this.composer = composer
    this.ioType = ioType
    this.io = io

    this.nodes = new SmartMap(io.store, (node) => new NodeState(node, this), { eager: true })
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
  const state = useMemo(() => (ioType === "in" ? composer.inputs : composer.outputs), [composer, ioType])

  return state
}

export const IOContext = createContext({} as IOState)

export function useParentIOState() {
  return useContext(IOContext)
}
