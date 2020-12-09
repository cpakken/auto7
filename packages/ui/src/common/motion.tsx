import { motionEnhance } from "@utils/motion-enhance"
import { Flex, Box } from "."
// import { Flex, Box } from "@chakra-ui/react"

type BufferType<T> = T

interface IMotionFlex extends BufferType<typeof _MotionFlex> {}
const _MotionFlex = motionEnhance(Flex)
export const MotionFlex: IMotionFlex = _MotionFlex

interface IMotionBox extends BufferType<typeof _MotionBox> {}
const _MotionBox = motionEnhance(Box)
export const MotionBox: IMotionBox = _MotionBox

//Reference https://mobx-state-tree.js.org/tips/typescript optimization typesript
