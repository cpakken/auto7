import { animate, MotionValue } from "framer-motion"
import { useConstant } from "@utils/react"
import { animateEnhanced } from "@utils/motion"
import { clamp } from "popmotion"

export type ScrollControls = ReturnType<typeof useScrollControls>
export function useScrollControls(
  scroll: MotionValue<number>,
  options: {
    min?: number
    max?: number
    buffer?: number //ignore push / move commands if within constraints with buffer
  }
) {
  return useConstant(() => {
    const { min, max, buffer = 20 } = options

    const push = (targetVelocity: number, acceleration = 1500) => {
      const enable =
        targetVelocity > 0 ? max === undefined || scroll.get() < max - buffer : min === undefined || scroll.get() > min + buffer

      if (enable) animateEnhanced(scroll, { type: "push", min, max, acceleration, targetVelocity }).then(stop)
      // else {
      //   //instead of .then(stop)
      //   //to spring(mix()) elastic
      // }
    }

    //for mouse wheel scroll -> constant offset
    const move = (delta: number) => {
      //TODO use if -> check if value is within constraints before moveing
      animate(scroll, clamp(min || -Infinity, max || Infinity, scroll.get() + delta))
    }

    const stop = () => {
      animateEnhanced(scroll, {
        type: "inertia",
        power: 0.7,
        min,
        max,
        bounceDamping: 30,
        bounceStiffness: 300,
      })
    }

    return { push, move, stop }
  })
}
