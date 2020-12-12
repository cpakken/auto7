import { motionEnhance } from "@utils/motion"
import { StyleConfig } from "@utils/chakra-enhance"
import { createChakraDiv, createChakraFlex } from "./chakra"

export function createMotionChakraDiv(styleConfig: StyleConfig) {
  const MotionEnhanced = motionEnhance(createChakraDiv(styleConfig))
  return MotionEnhanced
}

export function createMotionChakraFlex(styleConfig: StyleConfig) {
  const MotionEnhanced = motionEnhance(createChakraFlex(styleConfig))
  return MotionEnhanced
}
