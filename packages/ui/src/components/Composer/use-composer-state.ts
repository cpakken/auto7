import { useConstant } from "@utils/react"
import { createContext, useContext } from "react"
import { LogicComposed, LogicComposedShallowReady } from "@main/controllers"
import { IOState } from "../IO/use-io-state"
import { CompositionState } from "../Composition/use-composition-state"

export class ComposerState {
  composed: LogicComposed
  inputs: IOState
  outputs: IOState
  composition: CompositionState

  constructor(composed: LogicComposedShallowReady) {
    this.composed = composed

    const { inputs, outputs } = composed.info
    this.inputs = new IOState("in", inputs, this)
    this.outputs = new IOState("out", outputs, this)
    this.composition = new CompositionState(composed.composition, this)
  }
}

export function useComposerState(composed: LogicComposedShallowReady) {
  const state = useConstant(() => new ComposerState(composed))
  return state
}

// export const ComposerContext = createContext(new ComposerState())
export const ComposerContext = createContext({} as ComposerState)

export function useParentComposerState() {
  return useContext(ComposerContext)
}
