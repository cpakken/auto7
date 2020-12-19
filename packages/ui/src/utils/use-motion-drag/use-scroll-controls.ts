import { MotionValue, animate } from "framer-motion"
import { useConstant } from "@utils/react"
import { animateEnhanced } from "@utils/motion"
import { clamp } from "popmotion"

export type ScrollControlsOptions = {
  min?: number
  max?: number
  /** ignore push / move commands if scroll is within constraints and buffer*/
  buffer?: number
}

export class ScrollControls {
  scroll: MotionValue<number>
  options: ScrollControlsOptions

  private scrollTarget: number | null = null
  private resetScrollTarget = () => (this.scrollTarget = null)

  constructor(scroll: MotionValue<number>, options: ScrollControlsOptions) {
    this.scroll = scroll
    this.options = options
  }

  move = (delta: number) => {
    //TODO use if -> check if value is within constraints before moveing
    const { scroll } = this
    const { min, max } = this.options

    //Initialize
    if (this.scrollTarget === null) this.scrollTarget = scroll.get()
    const { scrollTarget } = this
    const next = clamp(min ?? -Infinity, max ?? Infinity, scrollTarget + delta)

    if (scrollTarget !== next) {
      animate(scroll, next, {
        onComplete: this.resetScrollTarget,
        type: "spring",
        damping: 25,
        stiffness: 250,
      })
      this.scrollTarget = next
    }
  }

  // push = (targetVelocity: number, acceleration = 2500, targetOffsetIfConstrianed: number ) => {
  push = (targetVelocity: number, acceleration = 2500) => {
    const { scroll } = this
    const { min, max, buffer = 20 } = this.options

    // if (targetVelocity > 0 && max && scroll.get() > max) {
    //   //isPassMax
    //   console.log("passMax")
    //   // animate(scroll, max + 60)
    //   animate({
    //     from: scroll.get(),
    //     velocity: scroll.getVelocity(),
    //     to: max + 60,
    //     onUpdate: (v) => scroll.set(v),
    //     type: "spring",
    //   })
    // } else if (targetVelocity < 0 && min && scroll.get() < min) {
    //   //isPassMin
    //   // console.log("passMin")
    //   // animate(scroll, min - targetVelocity)
    // } else {
    //   //isWithinConstriants push
    //   // console.log("push")
    //   animateEnhanced(scroll, { type: "push", min, max, acceleration, targetVelocity })
    // }

    const enable =
      targetVelocity > 0 ? max === undefined || scroll.get() < max - buffer : min === undefined || scroll.get() > min + buffer
    if (enable)
      animateEnhanced(scroll, {
        type: "push",
        // min: min && min + buffer,
        // max: max && max - buffer,
        min,
        max,
        acceleration,
        targetVelocity,
        // onComplete: this.stop,
        onComplete: () => {
          console.log("complete", scroll.get(), scroll.getVelocity())
          this.stop()
        },
      })
  }

  stop = () => {
    const { min, max } = this.options
    console.log("stop", this.scroll.get(), this.scroll.getVelocity())

    animateEnhanced(this.scroll, {
      type: "inertia",
      power: 0.7,
      min,
      max,
      bounceDamping: 20,
      bounceStiffness: 200,
    })
  }
}

export function useScrollControls(scroll: MotionValue<number>, options: ScrollControlsOptions) {
  return useConstant(() => new ScrollControls(scroll, options))
}
