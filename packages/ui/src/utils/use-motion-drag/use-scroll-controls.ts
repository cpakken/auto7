import { MotionValue } from "framer-motion"
import { useConstant } from "@utils/react"
import { animateEnhanced } from "@utils/motion"
import { interpolate } from "popmotion"

//TODO create animation function to use on MotionValue.start(animation)
//So it automatically stops the previous animation before starting the new one
//use for velocity and scroll motionvalue

export function useScrollControls(
  scroll: MotionValue<number>,
  options: {
    speed?: number | { min: number; max: number; buffer: number }
    acceleration?: number
    min?: number
    max?: number
    buffer?: number
  }
) {
  const { speed = 200, acceleration = 1500, min, max, buffer = 20 } = options
  const getSpeed = typeof speed === "number" ? () => speed : interpolate([0, speed.buffer], [speed.min, speed.max])

  return useConstant(() => {
    const increase = (delta: number = 0) => {
      if (max === undefined || scroll.get() < max - buffer)
        animateEnhanced(scroll, {
          type: "push",
          min,
          max,
          acceleration,
          targetVelocity: getSpeed(Math.abs(delta)),
        }).then(stop)
    }

    const decrease = (delta: number = 0) => {
      if (min === undefined || scroll.get() > min + buffer) {
        animateEnhanced(scroll, {
          type: "push",
          min,
          max,
          acceleration,
          targetVelocity: -getSpeed(Math.abs(delta)),
        }).then(stop)
      }
    }

    const stop = () => {
      animateEnhanced(scroll, { type: "inertia", power: 0.7, min, max, bounceDamping: 30, bounceStiffness: 450 })
    }

    return { increase, decrease, stop }
  })
}
