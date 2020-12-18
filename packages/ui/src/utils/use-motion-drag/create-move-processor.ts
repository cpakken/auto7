import { mix } from "popmotion"
import { MotionDrag } from "./use-motion-drag"

export type MoveProcessor = ReturnType<typeof createMoveProcessor>
export function createMoveProcessor(axis: "x" | "y", dragController: MotionDrag) {
  const position = dragController.position[axis]
  if (position) {
    const offset = dragController.options.offset?.[axis]
    const origin = { val: position.get(), offset: offset?.get() }
    const constraint = dragController.options.constraints?.[axis]

    //constraint state
    const cs = { min: false, max: false }

    return (mouseOffset: number) => {
      const mouse = mouseOffset + origin.val

      if (constraint) {
        const { elastic = 0.4 } = constraint
        const { min, max } = constraint

        if (offset) {
          const offsetVal = offset.get()
          const offsetDelta = origin.offset! - offsetVal

          const pos = mouse + offsetDelta

          const max_ = max - offsetVal
          const min_ = min - offsetVal

          //Constraint Max
          if (pos > max_) {
            const val_c = mix(max_, pos, elastic)

            if (!cs.max) {
              cs.max = true
              constraint.onStart?.("max")
            }

            constraint.onMove?.(pos - max_, val_c - max_)
            return position.set(val_c)
          }

          //Constraint Min
          else if (pos < min_) {
            const val_c = mix(min_, pos, elastic)

            if (!cs.min) {
              cs.min = true
              constraint.onStart?.("min")
            }

            constraint.onMove?.(val_c - min_, pos - min_)
            return position.set(val_c)
          }

          //normal
          if (cs.max) {
            cs.max = false
            constraint.onEnd?.("max")
          }

          if (cs.min) {
            cs.min = false
            constraint.onEnd?.("min")
          }

          return position.set(pos)
        } else {
          //NO OFFSET
          return position.set(
            mouseOffset > max ? mix(max, mouseOffset, elastic) : mouseOffset < min ? mix(min, mouseOffset, elastic) : mouseOffset
          )
        }
      }
    }
  }
}
