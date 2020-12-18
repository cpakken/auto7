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

  constructor(scroll: MotionValue<number>, options: ScrollControlsOptions) {
    this.scroll = scroll
    this.options = options
  }

  move = (delta: number = 30) => {
    //TODO use if -> check if value is within constraints before moveing
    const { scroll } = this
    const { min, max } = this.options

    let targetPosition: number | null = null
    const resetPosition = () => (targetPosition = null)

    if (targetPosition === null) targetPosition = scroll.get()
    targetPosition = clamp(min || -Infinity, max || Infinity, targetPosition + delta)
    animate(scroll, targetPosition, { onComplete: resetPosition, onStop: resetPosition })
  }

  // push = (targetVelocity: number, acceleration = 1500, targetOffsetIfConstrianed: number ) => {
  push = (targetVelocity: number, acceleration = 1500) => {
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
    if (enable) animateEnhanced(scroll, { type: "push", min, max, acceleration, targetVelocity }).then(this.stop)
  }

  stop = () => {
    const { min, max } = this.options

    console.log("stop")
    animateEnhanced(this.scroll, {
      type: "inertia",
      power: 0.7,
      min,
      max,
      bounceDamping: 30,
      bounceStiffness: 300,
    })
  }
}

export function useScrollControls(scroll: MotionValue<number>, options: ScrollControlsOptions) {
  return useConstant(() => new ScrollControls(scroll, options))
}
