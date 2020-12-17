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
  return () => {
    const { velocity } = options
    let vel = motion.getVelocity()

    const velStop = animate({
      from: vel,
      to: velocity,
      onUpdate: (v) => (vel = v),
      bounce: 0.15,
    }).stop

    const process = sync.update(({ delta }) => {
      const val = motion.get() + (vel * delta) / 1000
      motion.set(val)
    }, true)

    return () => {
      velStop()
      cancelSync.update(process)
    }
  }
}

type AnimateEnhancedConfig = ({ type: "inertia" } & InertiaConfig) | ({ type: "push" } & PushConfig)

export function animateEnhanced(motion: MotionValue<number>, config: AnimateEnhancedConfig) {
  const animation = config.type === "inertia" ? createInertiaAnimation(motion, config) : createPushAnimation(motion, config)
  return motion.start(animation)
}
