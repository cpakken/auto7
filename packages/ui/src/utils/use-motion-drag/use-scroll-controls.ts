import { MotionValue, useMotionValue } from "framer-motion"
import sync, { Process, cancelSync } from "framesync"
import { inertia, animate } from "popmotion"
import { useConstant } from "@utils/react"

function animateVel(motion: MotionValue<number>, config: { from: number; to: number; [key: string]: any }) {
  return animate({
    ...config,
    onUpdate: (v) => motion.set(v),
    bounce: 0.2,
  }).stop
}

//TODO create animation function to use on MotionValue.start(animation)
//So it automatically stops the previous animation before starting the new one
//use for velocity and scroll motionvalue

export function useScrollControls(scroll: MotionValue<number>, options: { max?: number; min?: number; speed?: number } = {}) {
  const velocity = useMotionValue(0)

  return useConstant(() => {
    const { speed = 200 } = options

    let process: Process | null = null
    let inertiaStop: (() => void) | null = null
    let velStop: (() => void) | null = null

    const increase = () => {
      // const speed_ = interpolate([max, max + buffer], [speedMin, speedMax], {clamp: true})(val)
      velStop?.()
      velStop = animateVel(velocity, { from: scroll.getVelocity(), to: speed })

      inertiaStop?.()
      process = sync.update(({ delta }) => {
        // const scrollDelta = (speed * delta) / 1000
        const scrollDelta = (velocity.get() * delta) / 1000
        scroll.set(scroll.get() + scrollDelta)
      }, true)
    }

    const decrease = () => {
      // const speed_ = interpolate([max, max + buffer], [speedMin, speedMax], {clamp: true})(val)

      velStop?.()
      velStop = animateVel(velocity, { from: scroll.getVelocity(), to: -speed })

      inertiaStop?.()

      process = sync.update(({ delta }) => {
        // const scrollDelta = (speed * delta) / 1000
        const scrollDelta = (velocity.get() * delta) / 1000
        scroll.set(scroll.get() + scrollDelta)
      }, true)
    }

    const stop = () => {
      if (process) {
        cancelSync.update(process)
        process = null

        inertiaStop = inertia({ from: scroll.get(), velocity: scroll.getVelocity(), onUpdate: (v) => scroll.set(v) }).stop
      }
    }

    // return { scrollMax, scrollMin, scrollStop }
    return { increase, decrease, stop }
  })
}
