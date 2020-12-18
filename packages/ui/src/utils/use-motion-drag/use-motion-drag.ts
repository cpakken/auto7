import { MotionValue } from "framer-motion"
import { useConstant } from "@utils/react"
import { useMemo } from "react"
import { createMoveProcessor, MoveProcessor } from "./create-move-processor"

type DragPosition = { x?: MotionValue<number>; y?: MotionValue<number> }

export type DragConstraints = { x?: DragConstraint; y?: DragConstraint }
export type DragConstraint = { min: number; max: number; elastic?: number } & DragConstraintHooks
export type DragConstraintHooks = {
  onStart?: (type: "min" | "max") => void
  onEnd?: (type: "min" | "max" | "release") => void

  /**
   * @description triggers when value is outside the range of constraint parameters
   * @param delta distance between mouse and constraint
   * @param elasticDelta elastic distance between motionValue and constraint
   * @remarks negative for min, positive for max
   */
  onMove?: (delta: number, elasticDelta: number) => void
}

type DragHook = (position: DragPosition) => void
type DragOffset = { x: MotionValue<number>; y: MotionValue<number> }

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

  private processors: { x: MoveProcessor; y: MoveProcessor } | null = null

  constructor(position: DragPosition, options: DragOptions = {}) {
    this.position = position
    this.options = options
  }

  setOptions = (options: DragOptions) => {
    this.options = options
  }

  onPanStart = () => {
    this.processors = {
      x: createMoveProcessor("x", this),
      y: createMoveProcessor("y", this),
    }

    // onDragStart?.(this.position)
  }

  onPanEnd = () => {
    this.processors = null

    const { constraints } = this.options
    constraints && Object.values(constraints).forEach((c) => c?.onEnd?.("release"))

    this.options.onDragEnd?.(this.position)
  }

  onPan = (_, { offset }) => {
    const { x, y } = this.processors!
    x?.(offset.x)
    y?.(offset.y)
  }
}

export function useMotionDrag(position: DragPosition, options: DragOptions = {}) {
  const { onPan, onPanStart, onPanEnd, setOptions } = useConstant(() => new MotionDrag(position, options))
  useMemo(() => setOptions(options), [options])

  return { onPan, onPanStart, onPanEnd }
}
