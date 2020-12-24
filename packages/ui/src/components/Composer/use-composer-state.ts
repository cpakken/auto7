import { createContext, RefObject, useContext, useLayoutEffect, useState } from "react"
import { isShallowReady, LogicComposed, LogicComposedShallowReady } from "@main/controllers"
import { IOState } from "../IO/use-io-state"
import { CompositionState } from "../Composition/use-composition-state"
import { action, makeObservable, observable } from "mobx"
import { when } from "@utils/mobx"

export type Dimensions = { width: number; height: number }

// @refresh reset
export class ComposerState {
  @observable.ref dimensions: Dimensions

  composed: LogicComposedShallowReady
  inputs: IOState
  outputs: IOState
  composition: CompositionState

  constructor(composed: LogicComposedShallowReady, initialDimensions: Dimensions) {
    makeObservable(this)
    this.composed = composed
    this.dimensions = initialDimensions

    const { inputs, outputs } = composed.info
    this.inputs = new IOState("in", inputs, this)
    this.outputs = new IOState("out", outputs, this)
    this.composition = new CompositionState(this)
  }

  // @action.bound initialize() {
  //   const { offsetWidth, offsetHeight } = this.ref.current!
  //   this.dimensions = { width: offsetWidth, height: offsetHeight }
  // }

  @action.bound setDimensions(dimensions: Dimensions) {
    this.dimensions = dimensions
  }

  @action.bound dispose() {
    this.inputs.dispose()
    this.outputs.dispose()
    this.composition.dispose()
  }
}

export function useComposerState(ref: RefObject<HTMLDivElement>, composed: LogicComposed) {
  const [state, setState] = useState<ComposerState | null>(null)

  useLayoutEffect(() => {
    if (isShallowReady(composed)) {
      const { offsetWidth, offsetHeight } = ref.current!
      setState(new ComposerState(composed, { width: offsetWidth, height: offsetHeight }))
    } else {
      when(
        () => isShallowReady(composed) && composed,
        (composed) => {
          const { offsetWidth, offsetHeight } = ref.current!
          setState(new ComposerState(composed, { width: offsetWidth, height: offsetHeight }))
        }
      )
    }

    return () => state?.dispose()
  }, [])

  return state
}

// export const ComposerContext = createContext(new ComposerState())
export const ComposerContext = createContext({} as ComposerState)

export function useParentComposerState() {
  return useContext(ComposerContext)
}
