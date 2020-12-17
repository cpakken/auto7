import { MotionValue } from "framer-motion"
import { StartAnimation } from "framer-motion/types/value"
import sync, { cancelSync } from "framesync"
import { inertia, InertiaOptions } from "popmotion"

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

type PushConfig = {
  targetVelocity: number
  acceleration?: number //accleration is a magnitude -> must be positive
  min?: number
  max?: number
}
export function createPushAnimation(motion: MotionValue<number>, options: PushConfig): StartAnimation {
  return (complete) => {
    const { targetVelocity, acceleration = 1500, min, max } = options

    let velocity = motion.getVelocity()

    const velProcess = sync.update(({ delta }) => {
      if (velocity !== targetVelocity) {
        const acc = velocity < targetVelocity ? acceleration : -acceleration
        const next = velocity + (acc * delta) / 1000
        velocity = acc > 0 ? Math.min(next, targetVelocity) : Math.max(next, targetVelocity)
      }
    }, true)

    const posProcess = sync.update(({ delta }) => {
      const val = motion.get() + (velocity * delta) / 1000

      if ((min !== undefined && val < min) || (max !== undefined && val > max)) {
        stop()
        complete()
      }

      motion.set(val)
    }, true)

    const stop = () => {
      cancelSync.update(velProcess)
      cancelSync.update(posProcess)
    }

    return stop
  }
}

type AnimateEnhancedConfig = ({ type: "inertia" } & InertiaConfig) | ({ type: "push" } & PushConfig)

export function animateEnhanced(motion: MotionValue<number>, config: AnimateEnhancedConfig) {
  const animation = config.type === "inertia" ? createInertiaAnimation(motion, config) : createPushAnimation(motion, config)
  return motion.start(animation)
}
