import { mix } from "popmotion"
import { DragConstraint, MotionDrag } from "./use-motion-drag"

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
          //CONSTRAINT & OFFSET
          const offsetVal = offset.get()
          const offsetDelta = origin.offset! - offsetVal

          const pos = mouse + offsetDelta

          const min_ = min - offsetVal
          const max_ = max - offsetVal

          return position.set(processConstraint(pos, min_, max_, elastic, cs, constraint))
        } else {
          //CONSTRAINT & NO OFFSET
          return position.set(processConstraint(mouse, min, max, elastic, cs, constraint))
        }
      }
      //NO CONSTRAINT & NO OFFSET
      return position.set(mouse)
    }
  }
}

function processConstraint(
  pos: number,
  min: number,
  max: number,
  elastic: number,
  cs: { min: boolean; max: boolean },
  constraint: DragConstraint
) {
  //Constraint Max
  if (pos > max) {
    const pos_c = mix(max, pos, elastic)

    if (!cs.max) {
      cs.max = true
      constraint.onStart?.("max")
    }

    constraint.onMove?.(pos - max, pos_c - max)
    return pos_c
  }

  //Constraint Min
  else if (pos < min) {
    const pos_c = mix(min, pos, elastic)

    if (!cs.min) {
      cs.min = true
      constraint.onStart?.("min")
    }

    constraint.onMove?.(pos - min, pos_c - min)
    return pos_c
  }

  //Normal
  if (cs.max) {
    cs.max = false
    constraint.onEnd?.("max")
  }

  if (cs.min) {
    cs.min = false
    constraint.onEnd?.("min")
  }

  return pos
}
