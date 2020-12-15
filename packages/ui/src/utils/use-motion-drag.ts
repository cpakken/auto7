import { MotionValue } from "framer-motion"
import { useConstant } from "@utils/react"
import { mix } from "popmotion"
import { useMemo } from "react"

type DragPosition = { x?: MotionValue<number>; y?: MotionValue<number> }
type DragConstraint = { min: number; max: number; elastic?: number }
type DragConstraints = { x?: DragConstraint; y?: DragConstraint }

type DragHook = (position: DragPosition) => void

type DragOptions = {
  constraints?: DragConstraints
  scroll?
  scrollOnEdge?

  onDragStart?: DragHook
  onDragEnd?: DragHook
  // onDrag?: DragHook
  onDrag?: (xy: { x?: number; y?: number }) => void
}

// @refresh reset
class MotionDrag {
  private position: DragPosition
  private options: DragOptions

  private origin: { x?: number; y?: number } | null = null

  constructor(position: DragPosition, options: DragOptions = {}) {
    this.position = position
    this.options = options
  }

  setOptions = (options: DragOptions) => {
    this.options = options
  }

  onPanStart = () => {
    // window.addEventListener("mousemove", this.onMouseMove)
    const { x, y } = this.position
    this.origin = { x: x?.get(), y: y?.get() }
    this.options.onDragStart?.(this.position)
  }

  onPanEnd = () => {
    // window.removeEventListener("mousemove", this.onMouseMove)
    this.origin = null
    this.options.onDragEnd?.(this.position)
  }

  onPan = (_, { offset }) => {
    const { x, y } = this.position
    const { origin } = this
    const { constraints } = this.options

    if (x) {
      const c = constraints?.x
      let xVal = offset.x + origin!.x

      if (c) {
        const { elastic = 0.4 } = c
        xVal = xVal > c.max ? mix(c.max, xVal, elastic) : xVal < c.min ? mix(c.min, xVal, elastic) : xVal
      }

      x.set(xVal)
    }

    if (y) {
      const c = constraints?.y
      let yVal = offset.y + origin!.y

      if (c) {
        const { elastic = 0.4 } = c
        yVal = yVal > c.max ? mix(c.max, yVal, elastic) : yVal < c.min ? mix(c.min, yVal, elastic) : yVal
      }

      y.set(yVal)
    }

    this.options.onDrag?.({
      ...(x && { x: x.get() }),
      ...(y && { y: y.get() }),
    })
  }
}

export function useMotionDrag(position: DragPosition, options: DragOptions = {}) {
  const { onPan, onPanStart, onPanEnd, setOptions } = useConstant(() => new MotionDrag(position, options))
  useMemo(() => setOptions(options), [options])

  return { onPan, onPanStart, onPanEnd }
}
