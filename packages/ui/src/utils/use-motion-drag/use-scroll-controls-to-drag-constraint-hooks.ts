import { useConstant } from "@utils/react"
import { interpolate } from "popmotion"
import { DragConstraintHooks, ScrollControls } from "."

export function useScrollControlsToDragConstraintHooks(
  controls: ScrollControls,
  options: {
    min: number
    max: number
    buffer: number
  }
): DragConstraintHooks {
  return useConstant(() => {
    const { push, stop } = controls
    const { min, max, buffer } = options

    return {
      onMove: (delta) => {
        const targetSpeed = interpolate([0, buffer], [min, max])(Math.abs(delta))
        push(delta > 0 ? -targetSpeed : targetSpeed)
      },
      onEnd: stop,
    }
  })
}
