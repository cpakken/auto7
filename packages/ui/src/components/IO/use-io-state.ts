import { createContext, useContext } from "react"
import { makeAutoObservable } from "mobx"
import { ILogicNode } from "@main/controllers"
import { useConstant } from "@utils/react"

export class IOState {
  isEdit = false
  nodeEdit: ILogicNode | null = null

  editNode(node: ILogicNode) {
    this.isEdit = true
    this.nodeEdit = node
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export function useIOState() {
  const state = useConstant(() => new IOState())

  return state
}

export const IOContext = createContext(new IOState())

export function useParentIOState() {
  return useContext(IOContext)
}
