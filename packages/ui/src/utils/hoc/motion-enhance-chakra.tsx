import { forwardRef, FunctionComponent, useMemo } from "react"
import { MotionProps, Variants } from "framer-motion"
import { filterMotionKeys, motionEnhance } from "@utils/motion"
import { ChakraEnhanced, PropsOf } from "@utils/chakra-enhance"

export function motionEnhanceChakra<C extends ChakraEnhanced, V extends Variants, ChakraProps extends PropsOf<C>>(
  Chakra: C,
  variantsEnhanced?: V
) {
  const Motion = motionEnhance(Chakra)

  const Enhanced = forwardRef((props, ref) => {
    const { animate, variants, style, ...rest } = props

    //Process variants styles
    //Process animate, whileHover, whileDrag, style etc...

    const forwardKeys = filterMotionKeys(rest)

    return <Motion ref={ref} {...forwardKeys} />
  }) as FunctionComponent<ChakraProps & MotionProps>

  return Enhanced
}

function useProcessMotionStyles(style) {
  return useMemo(() => {}, [style])
}
