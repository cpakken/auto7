import { StyleConfig, createChakraDiv } from "@utils/chakra-enhance"
import { motionEnhance } from "@utils/motion"

export function createMotionChakraDiv(styleConfig: StyleConfig) {
  const MotionEnhanced = motionEnhance(createChakraDiv(styleConfig))
  return MotionEnhanced
}

// export function motionChakra<T extends As>(ElementType: T, styleConfig: StyleConfig, motionVariants?: Variants) {
//   const MotionEnhanced = motionEnhance(chakraEnhance(ElementType, styleConfig), motionVariants)
//   return MotionEnhanced
// }
