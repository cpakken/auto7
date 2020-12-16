import { mix } from "popmotion"
import { MotionDrag } from "./use-motion-drag"
import { getFrameData } from "framesync"

export type MoveProcessor = ReturnType<typeof createMoveProcessor>
export function createMoveProcessor(axis: "x" | "y", dragController: MotionDrag) {
  const position = dragController.position[axis]
  if (position) {
    const offset = dragController.options.offset?.[axis]
    const origin = { val: position.get(), offset: offset?.get() }
    const constraint = dragController.options.constraints?.[axis]

    //constraint state
    const cs = { min: false, max: false }

    //Can be useless when implement hooks
    const scroll = dragController.options.scroll?.[axis]

    return (mouseOffset: number) => {
      const mouse = mouseOffset + origin.val

      if (constraint) {
        const { elastic = 0.5 } = constraint
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
              constraint.onMaxStart?.()
            }

            if (scroll) {
              const { delta } = getFrameData()
              const { speed = 140 } = scroll
              // const speed_ = interpolate([max, max + buffer], [speedMin, speedMax], {clamp: true})(val)

              const scrollDelta = (speed * delta) / 1000

              offset.set(offsetVal - scrollDelta)
              position.set(val_c + scrollDelta)
              return
            }

            return position.set(val_c)
          }

          //Constraint Min
          else if (pos < min_) {
            const val_c = mix(min_, pos, elastic)

            if (!cs.min) {
              cs.min = true
              constraint.onMinStart?.()
            }

            if (scroll) {
              const { delta } = getFrameData()
              const { speed = 140 } = scroll
              // const speed_ = interpolate([max, max + buffer], [speedMin, speedMax], {clamp: true})(val)

              const scrollDelta = (speed * delta) / 1000

              offset.set(offsetVal + scrollDelta)
              position.set(val_c - scrollDelta)
              return
            }

            return position.set(val_c)
          }

          //normal
          if (cs.max) {
            cs.max = false
            constraint.onMaxEnd?.()
          }

          if (cs.min) {
            cs.min = false
            constraint.onMinEnd?.()
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
