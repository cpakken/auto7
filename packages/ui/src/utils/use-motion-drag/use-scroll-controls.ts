import { MotionValue } from "framer-motion"
import { useConstant } from "@utils/react"
import { animateEnhanced } from "@utils/motion"

//TODO create animation function to use on MotionValue.start(animation)
//So it automatically stops the previous animation before starting the new one
//use for velocity and scroll motionvalue

export function useScrollControls(scroll: MotionValue<number>, options: { max?: number; min?: number; speed?: number } = {}) {
  return useConstant(() => {
    const { speed = 200 } = options

    const increase = () => {
      // const speed_ = interpolate([max, max + buffer], [speedMin, speedMax], {clamp: true})(val)
      animateEnhanced(scroll, { type: "push", velocity: speed })
    }

    const decrease = () => {
      // const speed_ = interpolate([max, max + buffer], [speedMin, speedMax], {clamp: true})(val)
      animateEnhanced(scroll, { type: "push", velocity: -speed })
    }

    const stop = () => {
      animateEnhanced(scroll, { type: "inertia" })
    }

    return { increase, decrease, stop }
  })
}
