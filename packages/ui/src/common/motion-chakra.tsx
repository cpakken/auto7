import { Variants } from "framer-motion"
import { StyleConfig, chakraDiv } from "@utils/chakra-enhance"
import { motionEnhanceVariants } from "@utils/motion-enhance"

export function MotionBox(styleConfig: StyleConfig, motionVariants?: Variants) {
  return motionEnhanceVariants(chakraDiv(styleConfig), motionVariants)
}
