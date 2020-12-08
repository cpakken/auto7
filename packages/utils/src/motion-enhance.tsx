import { forwardRef, ComponentType } from "react"
import { motion } from "framer-motion"

const motionPropKeys = new Set(["whileHover"])

function filterMotionKeys<M extends {}>(obj: M) {
  const ret = {} as any
  for (const k in obj) {
    if (!motionPropKeys.has(k)) ret[k] = obj[k]
  }
  return ret
}

export function motionEnhance<P>(Component: ComponentType<P>) {
  return motion.custom(
    forwardRef((props: P, ref) => {
      const forwardKeys = filterMotionKeys(props)
      return <Component ref={ref} {...forwardKeys} />
    })
  )
}
