import { motionEnhance } from "@utils/motion"
import { StyleConfig } from "@utils/chakra-enhance"
import { createBox, createFlex } from "./chakra"

export function createMotionBox<S extends StyleConfig>(styleConfig: S) {
  const MotionEnhanced = motionEnhance(createBox(styleConfig))
  return MotionEnhanced
}

//Just use createMotionBox instead??
export function createMotionFlex<S extends StyleConfig>(styleConfig: S) {
  const MotionEnhanced = motionEnhance(createFlex(styleConfig))
  return MotionEnhanced
}
