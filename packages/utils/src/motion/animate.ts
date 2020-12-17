import { MotionValue } from "framer-motion"
import { StartAnimation } from "framer-motion/types/value"
import sync, { cancelSync } from "framesync"
import { inertia, InertiaOptions, animate } from "popmotion"

type InertiaConfig = Omit<InertiaOptions, "from" | "velocity" | "onUpdate" | "onComplete">
export function createInertiaAnimation(motion: MotionValue<number>, options: InertiaConfig): StartAnimation {
  return (complete) => {
    return inertia({
      from: motion.get(),
      velocity: motion.getVelocity(),
      onComplete: complete,
      onUpdate: (v) => motion.set(v),
      ...options,
    }).stop
  }
}

type PushConfig = { velocity: number }
export function createPushAnimation(motion: MotionValue<number>, options: PushConfig): StartAnimation {
  return (complete) => {
    const { velocity } = options

    let vel = 0

    const velStop = animate({
      from: motion.getVelocity(),
      to: velocity,
      onUpdate: (v) => (vel = v),
      bounce: 0.2,
    }).stop

    const process = sync.update(({ delta }) => {
      // const scrollDelta = (speed * delta) / 1000
      const scrollDelta = (vel * delta) / 1000
      motion.set(motion.get() + scrollDelta)
    }, true)

    return () => {
      cancelSync.update(process)
      velStop()
      complete()
    }
  }
}

type AnimateEnhancedConfig = ({ type: "inertia" } & InertiaConfig) | ({ type: "push" } & PushConfig)

export function animateEnhanced(motion: MotionValue<number>, config: AnimateEnhancedConfig) {
  const animation = config.type === "inertia" ? createInertiaAnimation(motion, config) : createPushAnimation(motion, config)
  return motion.start(animation)
}
