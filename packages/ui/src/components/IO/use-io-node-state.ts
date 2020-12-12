import { makeObservable, observable, action } from "mobx"
import { useMemo } from "react"
import { CompositionState, useParentCompositionState } from "../Composition/use-composition-state"

export class IONodeState {
  composition: CompositionState

  @observable isFocus = false
  @observable isHover = false

  constructor(composition: CompositionState) {
    makeObservable(this)
    this.composition = composition
  }

  @action.bound onFocus() {
    this.isFocus = true
  }
  @action.bound onBlur() {
    this.isFocus = false
  }
  @action.bound onHoverStart() {
    this.isHover = true
  }
  @action.bound onHoverEnd() {
    this.isHover = false
  }
}

export function useIONodeState() {
  //TODO link to composition state
  const composition = useParentCompositionState()
  const state = useMemo(() => new IONodeState(composition), [composition])

  return state
}
