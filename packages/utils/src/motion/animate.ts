import { MotionValue } from "framer-motion"
import { StartAnimation } from "framer-motion/types/value"
import sync, { cancelSync } from "framesync"
import { inertia, InertiaOptions, PlaybackControls } from "popmotion"

type InertiaConfig = Omit<InertiaOptions, "from" | "velocity">
export function createInertiaAnimation(motion: MotionValue<number>, options: InertiaConfig): StartAnimation {
  return (complete) => {
    return inertia({
      from: motion.get(),
      velocity: motion.getVelocity(),
      onComplete: () => {
        options.onComplete?.()
        complete()
      },
      onUpdate: (v) => {
        options.onUpdate?.(v)
        motion.set(v)
      },
      ...options,
    }).stop
  }
}

type PushConfig = {
  targetVelocity: number
  acceleration?: number //accleration is a magnitude -> must be positive
  min?: number
  max?: number
  onUpdate?: (v: number) => void
  onComplete?: () => void
}

export function createPushAnimation(motion: MotionValue<number>, options: PushConfig): StartAnimation {
  return (complete) => {
    const { targetVelocity, acceleration = 1500, min, max, onComplete, onUpdate } = options

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
        onComplete?.()
        complete()
      }

      onUpdate?.(val)
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

export function animateEnhanced(motion: MotionValue<number>, config: AnimateEnhancedConfig): PlaybackControls {
  const animation = config.type === "inertia" ? createInertiaAnimation(motion, config) : createPushAnimation(motion, config)
  motion.start(animation)
  return { stop: () => motion.stop() }
}
