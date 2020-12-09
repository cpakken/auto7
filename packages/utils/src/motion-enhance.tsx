import { forwardRef, ComponentType, FunctionComponent } from "react"
import { motion, MotionProps, Variants } from "framer-motion"

const motionPropKeys = new Set(["whileHover", "onHoverStart", "onHoverEnd", "drag"])

function filterMotionKeys<M extends {}>(obj: M) {
  const ret = {} as any
  for (const k in obj) {
    if (!motionPropKeys.has(k)) ret[k] = obj[k]
  }
  return ret
}

export function motionEnhance<P>(Component: ComponentType<P>) {
  const Enhanced = motion.custom(
    forwardRef((props: P, ref) => {
      const forwardKeys = filterMotionKeys(props)
      return <Component ref={ref} {...forwardKeys} />
    })
  )

  return Enhanced as FunctionComponent<Omit<P, "style"> & MotionProps>
}

export function motionEnhanceVariants<P>(Component: ComponentType<P>, variants: Variants) {
  const Motion = motionEnhance(Component)
  const Enhanced = forwardRef((props: P & Omit<MotionProps, "variants">, ref) => {
    return <Motion ref={ref} {...props} variants={variants} />
  })

  return Enhanced as FunctionComponent<Omit<P, "style"> & Omit<MotionProps, "variants">>
}
