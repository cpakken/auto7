import { Variants } from "framer-motion"
import { StyleConfig, chakraDiv } from "@utils/chakra-enhance"
import { motionEnhance } from "@utils/motion"

export function MotionBox(styleConfig: StyleConfig, motionVariants?: Variants) {
  return motionEnhance(chakraDiv(styleConfig), motionVariants)
}
