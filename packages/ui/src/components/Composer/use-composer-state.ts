import { createContext, createRef, useContext, useLayoutEffect, useMemo } from "react"
import { LogicComposedShallowReady } from "@main/controllers"
import { useConstant, useMemoCleanUp, useUnmountEffect } from "@utils/react"
import { IOState } from "../IO/use-io-state"
import { CompositionState } from "../Composition/use-composition-state"
import { action, makeObservable, observable } from "mobx"

export type Dimensions = { width: number; height: number }

// @refresh reset
export class ComposerState {
  ref = createRef<HTMLDivElement>()
  @observable.ref dimensions: Dimensions | null = null

  composed: LogicComposedShallowReady
  inputs: IOState
  outputs: IOState
  composition: CompositionState

  constructor(composed: LogicComposedShallowReady) {
    makeObservable(this)
    this.composed = composed

    const { inputs, outputs } = composed.info
    this.inputs = new IOState("in", inputs, this)
    this.outputs = new IOState("out", outputs, this)
    this.composition = new CompositionState(this)
  }

  @action.bound initialize() {
    const { offsetWidth, offsetHeight } = this.ref.current!
    this.dimensions = { width: offsetWidth, height: offsetHeight }
  }

  @action.bound dispose() {
    this.inputs.dispose()
    this.outputs.dispose()
    this.composition.dispose()
  }
}

export function useComposerState(composed: LogicComposedShallowReady) {
  // const state = useMemoCleanUp(
  //   () => {
  //     console.log("intialize")
  //     return new ComposerState(composed)
  //   },
  //   (prev) => prev.dispose()
  //   // [composed]
  // )

  const state = useConstant(() => {
    console.log("intialize!!")
    return new ComposerState(composed)
  })

  useUnmountEffect(state.dispose)

  useLayoutEffect(state.initialize, [state])

  return state
}

// export const ComposerContext = createContext(new ComposerState())
export const ComposerContext = createContext({} as ComposerState)

export function useParentComposerState() {
  return useContext(ComposerContext)
}
