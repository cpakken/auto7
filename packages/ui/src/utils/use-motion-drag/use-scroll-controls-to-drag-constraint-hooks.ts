import { useConstant } from "@utils/react"
import { interpolate } from "popmotion"
import { DragConstraintHooks, ScrollControls } from "."

type ScrollControlsToDragConstraintHooksOptions = {
  /** minimum push speed*/
  min: number
  /** maximum push speed*/
  max: number
  /** interpolation range between current position and constraint*/
  range: number
}

export function useScrollControlsToDragConstraintHooks(
  controls: ScrollControls,
  options: ScrollControlsToDragConstraintHooksOptions
): DragConstraintHooks {
  return useConstant(() => {
    const { push, stop } = controls
    const { min, max, range } = options

    return {
      onMove: (delta) => {
        const targetSpeed = interpolate([0, range], [min, max])(Math.abs(delta))
        push(delta > 0 ? -targetSpeed : targetSpeed)
      },
      onEnd: stop,
    }
  })
}
