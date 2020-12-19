import { interpolate } from "popmotion"
import { useCallback, useMemo } from "react"
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
  return useMemo(() => {
    const { push, stop } = controls
    const { min, max, range } = options

    return {
      onMove: (delta) => {
        const targetSpeed = interpolate([0, range], [min, max])(Math.abs(delta))
        push(delta > 0 ? -targetSpeed : targetSpeed)
      },
      onEnd: stop,
    }
  }, [options])
}

export function useScrollMoveOnWheelHandler(s: { x?: ScrollControls; y?: ScrollControls }, offset: number = 50) {
  return useCallback(
    ({ deltaX, deltaY }) => {
      if (deltaX) s.x?.move(deltaX > 0 ? -offset : offset)
      if (deltaY) s.y?.move(deltaY > 0 ? -offset : offset)
    },
    [offset]
  )
}
