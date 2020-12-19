import { useMemo } from "react"
import { MotionValue } from "framer-motion"
import { useConstant } from "@utils/react"
import { createMoveProcessor, MoveProcessor } from "./create-move-processor"

type DragPosition = { x?: MotionValue<number>; y?: MotionValue<number> }

export type DragConstraints = { x?: DragConstraint; y?: DragConstraint }
export type DragConstraint = { min: number; max: number; elastic?: number } & DragConstraintHooks
export type DragConstraintHooks = {
  onStart?: (type: "min" | "max") => void
  onEnd?: (type: "min" | "max" | "release") => void

  /**
   * triggers when value is outside the range of constraint parameters
   * @param delta distance between mouse and constraint
   * @param elasticDelta elastic distance between motionValue and constraint
   * @remarks negative for min, positive for max
   */
  onMove?: (delta: number, elasticDelta: number) => void
}

type DragHook = (position: DragPosition) => void
type DragOffset = { x?: MotionValue<number>; y?: MotionValue<number> }

type DragOptions = {
  constraints?: DragConstraints
  offset?: DragOffset
  onDragStart?: DragHook
  onDragEnd?: DragHook
  onDrag?: (xy: { x?: number; y?: number }) => void
}

// @refresh reset
export class MotionDrag {
  position: DragPosition
  options: DragOptions

  private processors: { x?: MoveProcessor; y?: MoveProcessor } | null = null

  constructor(position: DragPosition, options: DragOptions = {}) {
    this.position = position
    this.options = options
  }

  setOptions = (options: DragOptions) => {
    this.options = options
  }

  onPanStart = () => {
    //Framesync update?? -> turn into drag motionValue animation that stops completes on panEnd
    this.processors = { x: createMoveProcessor("x", this), y: createMoveProcessor("y", this) }
    this.options.onDragStart?.(this.position)
  }

  onPan = (_, { offset }) => {
    const { x, y } = this.processors!
    if (x) x.setMouseOffset(offset.x)
    if (y) y.setMouseOffset(offset.y)
  }

  onPanEnd = () => {
    const { processors } = this
    if (processors) {
      processors?.x?.stop()
      processors?.y?.stop()
      this.processors = null

      // const { constraints } = this.options
      // if (constraints) {
      //   constraints.x?.onEnd?.("release")
      //   constraints.y?.onEnd?.("release")
      // }

      this.options.onDragEnd?.(this.position)
    }
  }
}

export function useMotionDrag(position: DragPosition, options: DragOptions = {}) {
  const drag = useConstant(() => new MotionDrag(position, options))
  useMemo(() => drag.setOptions(options), [options])

  return useConstant(() => {
    const { onPan, onPanStart, onPanEnd } = drag
    return { onPan, onPanStart, onPanEnd }
  })
}
