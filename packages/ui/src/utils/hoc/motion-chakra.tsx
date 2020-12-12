import { motionEnhance } from "@utils/motion"
import { StyleConfig } from "@utils/chakra-enhance"
import { createBox, createFlex } from "./chakra"

export function createMotionBox(styleConfig: StyleConfig) {
  const MotionEnhanced = motionEnhance(createBox(styleConfig))
  return MotionEnhanced
}

export function createMotionFlex(styleConfig: StyleConfig) {
  const MotionEnhanced = motionEnhance(createFlex(styleConfig))
  return MotionEnhanced
}
