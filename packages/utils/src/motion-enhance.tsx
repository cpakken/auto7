import { forwardRef, ComponentType, FunctionComponent } from "react"
import { motion, MotionProps, Variants, isValidMotionProp } from "framer-motion"

function filterMotionKeys<M extends {}>(obj: M) {
  const ret = {} as any
  for (const k in obj) {
    if (!isValidMotionProp(k)) ret[k] = obj[k]
  }
  return ret
}

export function motionEnhance<P>(Component: ComponentType<P>) {
  const Enhanced = motion.custom(
    forwardRef(({ style, ...props }: P & MotionProps, ref) => {
      const forwardKeys = filterMotionKeys(props)
      return <Component ref={ref} {...forwardKeys} style={style} />
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
