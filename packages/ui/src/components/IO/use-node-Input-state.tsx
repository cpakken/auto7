import { ChangeEvent, useRef, KeyboardEvent } from "react"
import { ILogicNode } from "@main/controllers"
import { useUnmountEffect } from "@utils/react"
import { useLocalObservable } from "mobx-react-lite"

export function useNodeInputState(node: ILogicNode) {
  const ref = useRef<HTMLInputElement>(null)
  // const parent = useParentNodeState()

  const state = useLocalObservable(
    () => ({
      ref,
      value: node.label,
      get isValid() {
        return state.value.length > 0
      },
      onChange(e: ChangeEvent<HTMLInputElement>) {
        state.value = e.target.value
      },
      resetLabel() {
        state.value = node.label
      },
      setLabel() {
        if (state.isValid) node.setLabel(state.value)
        else state.resetLabel()
      },
      onKeyDown({ key }: KeyboardEvent<HTMLInputElement>) {
        switch (key) {
          case "Escape":
            state.resetLabel()
          case "Enter":
            ref.current!.blur()
        }
      },
      onBlur() {
        state.setLabel()
        // parent.isEdit = false
      },
      onFocus() {
        // parent.isEdit = true
      },
    }),
    { ref: false }
  )

  useUnmountEffect(state.onBlur)

  return state
}
