import { ChangeEvent, useRef, KeyboardEvent } from "react"
import { useUnmountEffect } from "@utils/react"
import { useLocalObservable } from "mobx-react-lite"
import { ILogicNode } from "@main/controllers"

// @refresh reset
export function useNodeInputState(node: ILogicNode) {
  const ref = useRef<HTMLInputElement>(null)
  // const parent = useParentNodeState()

  const state = useLocalObservable(
    () => ({
      ref,
      value: node.label,
      get isValid() {
        return this.value.length > 0
      },
      onChange(e: ChangeEvent<HTMLInputElement>) {
        this.value = e.target.value
      },
      resetLabel() {
        this.value = node.label
      },
      setLabel() {
        if (this.isValid) node.setLabel(this.value)
        else this.resetLabel()
      },
      onKeyDown({ key }: KeyboardEvent<HTMLInputElement>) {
        switch (key) {
          case "Escape":
            this.resetLabel()
          case "Enter":
            ref.current!.blur()
        }
      },
      onBlur() {
        this.setLabel()
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
