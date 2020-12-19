import { MotionValue } from "framer-motion"
import { mix } from "popmotion"
import sync, { Process, cancelSync } from "framesync"
import { DragConstraint, MotionDrag } from "./use-motion-drag"

export class MoveProcessor {
  position: MotionValue<number>
  offset?: MotionValue<number>
  constraint?: DragConstraint
  origin: { val: number; offset?: number }

  /** constraint state */
  cs = { min: false, max: false }
  mouseOffset = 0

  fprocess: Process
  constructor(axis: "x" | "y", dragController: MotionDrag) {
    this.position = dragController.position[axis]!
    this.offset = dragController.options.offset?.[axis]
    this.constraint = dragController.options.constraints?.[axis]
    this.origin = { val: this.position.get(), offset: this.offset?.get() }

    this.fprocess = sync.preRender(this.update, true)
  }

  setMouseOffset(offset: number) {
    this.mouseOffset = offset
  }

  stop() {
    cancelSync.preRender(this.fprocess)
  }

  update = () => {
    const { constraint, offset, cs, position, origin } = this
    const mouse = this.mouseOffset + origin.val

    if (constraint) {
      const { elastic = 0.4 } = constraint
      const { min, max } = constraint

      if (offset) {
        //CONSTRAINT & OFFSET
        const offsetVal = offset.get()
        const offsetDelta = origin.offset! - offsetVal

        const pos = mouse + offsetDelta //TODO seems to be ahead/lag by 1 frame -> scrolling Maybe not frame synced???

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

export function createMoveProcessor(axis: "x" | "y", dragController: MotionDrag): MoveProcessor | undefined {
  const position = dragController.position[axis]
  return position && new MoveProcessor(axis, dragController)
}
