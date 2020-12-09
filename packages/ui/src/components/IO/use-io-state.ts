import { createContext, useContext } from "react"
import { makeAutoObservable } from "mobx"
import { ILogicNode } from "@main/controllers"
import { useConstant } from "@utils/react"

export type IOType = "in" | "out"

export class IOState {
  ioType: IOType

  isEdit = false
  nodeEdit: ILogicNode | null = null

  editNode(node: ILogicNode) {
    this.isEdit = true
    this.nodeEdit = node
  }

  constructor(ioType: IOType) {
    makeAutoObservable(this, { ioType: false }, { autoBind: true })
    this.ioType = ioType
  }
}

export function useIOState(ioType: IOType) {
  const state = useConstant(() => new IOState(ioType))

  return state
}

export const IOContext = createContext(new IOState("in"))

export function useParentIOState() {
  return useContext(IOContext)
}
