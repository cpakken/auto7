import { MotionValue } from "framer-motion"
import { useConstant } from "@utils/react"
import { useMemo } from "react"
import { createMoveProcessor, MoveProcessor } from "./create-move-processor"

type DragPosition = { x?: MotionValue<number>; y?: MotionValue<number> }

//Intead have hooks in DragConstraint options
//onMinStart onMinEnd onMin onMaxStart onMaxEnd onMax
type ConstraintCallback = () => void
type DragConstraint = {
  min: number
  max: number
  elastic?: number
  onMinStart?: ConstraintCallback
  onMinEnd?: ConstraintCallback
  onMin?: ConstraintCallback
  onMaxStart?: ConstraintCallback
  onMaxEnd?: ConstraintCallback
  onMax?: ConstraintCallback
}
type DragConstraints = { x?: DragConstraint; y?: DragConstraint }

//Not Ndeded
type ScrollConstraint = { min?: number; max?: number; speed?: number }
type DragEdgeScroll = { x?: ScrollConstraint; y?: ScrollConstraint }

type DragHook = (position: DragPosition) => void
type DragOffset = { x: MotionValue<number>; y: MotionValue<number> }

type DragOptions = {
  constraints?: DragConstraints
  offset?: DragOffset
  scroll?: DragEdgeScroll

  onDragStart?: DragHook
  onDragEnd?: DragHook
  // onDrag?: DragHook
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
