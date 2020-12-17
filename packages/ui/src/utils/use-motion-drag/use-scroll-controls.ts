import { MotionValue } from "framer-motion"
import { useConstant } from "@utils/react"
import { animateEnhanced } from "@utils/motion"
import { interpolate } from "popmotion"

//TODO create animation function to use on MotionValue.start(animation)
//So it automatically stops the previous animation before starting the new one
//use for velocity and scroll motionvalue

export function useScrollControls(
  scroll: MotionValue<number>,
  speed: number | { max: number; min: number; buffer: number } = 200
) {
  const getSpeed = typeof speed === "number" ? () => speed : interpolate([0, speed.buffer], [speed.min, speed.max])

  return useConstant(() => {
    const increase = (delta: number = 0) => {
      animateEnhanced(scroll, { type: "push", targetVelocity: getSpeed(Math.abs(delta)) })
    }

    const decrease = (delta: number = 0) => {
      animateEnhanced(scroll, { type: "push", targetVelocity: -getSpeed(Math.abs(delta)) })
    }

    const stop = () => {
      animateEnhanced(scroll, { type: "inertia" })
    }

    return { increase, decrease, stop }
  })
}
