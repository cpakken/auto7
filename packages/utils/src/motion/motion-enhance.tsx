import { forwardRef, ComponentType, FunctionComponent } from "react"
import { motion, MotionProps, isValidMotionProp } from "framer-motion"

export function filterMotionKeys<M extends {}>(obj: M) {
  const ret = {} as any
  for (const k in obj) {
    if (!isValidMotionProp(k)) ret[k] = obj[k]
  }
  return ret
}

// export function motionEnhance<P>(Component: ComponentType<P>): FunctionComponent<Omit<P, "style"> & MotionProps>
// export function motionEnhance<P>(
//   Component: ComponentType<P>,
//   _variants: Variants | undefined
// ): FunctionComponent<Omit<P, "style"> & Omit<MotionProps, "variants">>

export function motionEnhance<P>(Component: ComponentType<P>) {
  const Enhanced = motion.custom(
    forwardRef(({ style, variants, ...rest }: P & MotionProps, ref) => {
      const forwardKeys = filterMotionKeys(rest)
      return <Component ref={ref} {...forwardKeys} style={style} variants={variants} />
    })
  )

  return Enhanced as FunctionComponent<Omit<P, "style"> & MotionProps>
}
