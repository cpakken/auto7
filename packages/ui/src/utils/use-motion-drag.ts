import { MotionValue } from "framer-motion"
import { useConstant } from "@utils/react"
import { mix, interpolate } from "popmotion"
import { getFrameData } from "framesync"
import { useMemo } from "react"

type DragPosition = { x?: MotionValue<number>; y?: MotionValue<number> }

type DragConstraint = { min: number; max: number; elastic?: number }
type DragConstraints = { x?: DragConstraint; y?: DragConstraint }

type ScrollConstraint = { min?: number; max?: number; speed?: number } //acceleration??
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

type Origin = { val: number; offset?: number }

// @refresh reset
class MotionDrag {
  private position: DragPosition
  private options: DragOptions

  // private origin: { x?: number; y?: number } | null = null
  private origin: { x?: Origin; y?: Origin } | null = null

  constructor(position: DragPosition, options: DragOptions = {}) {
    this.position = position
    this.options = options
  }

  setOptions = (options: DragOptions) => {
    this.options = options
  }

  onPanStart = () => {
    const { x, y } = this.position
    const { onDragStart, offset } = this.options

    this.origin = {
      ...(x && { x: { val: x.get(), offset: offset?.x.get() } }),
      ...(y && { y: { val: y.get(), offset: offset?.y.get() } }),
    }

    onDragStart?.(this.position)
  }

  onPanEnd = () => {
    this.origin = null
    this.options.onDragEnd?.(this.position)
  }

  onPan = (_, { offset }) => {
    const { x, y } = this.origin!
    x && this.processMove("x", offset.x + x.val)
    y && this.processMove("y", offset.y + y.val)
  }

  private processMove(axis: "x" | "y", mouse: number) {
    const offset = this.options.offset?.[axis]
    const constraint = this.options.constraints?.[axis]
    const position = this.position[axis]

    if (position) {
      if (constraint) {
        const { elastic = 0.5 } = constraint
        const { min, max } = constraint

        if (offset) {
          const offsetVal = offset.get()
          const offsetDelta = this.origin![axis]!.offset! - offsetVal

          const pos = mouse + offsetDelta

          const max_ = max - offsetVal
          const min_ = min - offsetVal

          //constraint right
          if (pos > max_) {
            const val_c = mix(max_, pos, elastic)

            //hook onConstraintMax(posFromBase, elasticPosFromBase), onConstraintMin()
            // scroll logic can be put outside of this
            const scroll = this.options.scroll?.[axis]
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

          //constraint left
          else if (pos < min_) {
            const val_c = mix(min_, pos, elastic)

            const scroll = this.options.scroll?.[axis]
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
          return position.set(pos)
        } else {
          //NO OFFSET
          return position.set(mouse > max ? mix(max, mouse, elastic) : mouse < min ? mix(min, mouse, elastic) : mouse)
        }
      }
    }
  }
}

export function useMotionDrag(position: DragPosition, options: DragOptions = {}) {
  const { onPan, onPanStart, onPanEnd, setOptions } = useConstant(() => new MotionDrag(position, options))
  useMemo(() => setOptions(options), [options])

  return { onPan, onPanStart, onPanEnd }
}
