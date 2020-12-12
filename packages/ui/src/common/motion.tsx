import { motionEnhance } from "@utils/motion"
import { Flex, Box, Center } from "./chakra"

type BufferType<T> = T

interface IMotionFlex extends BufferType<typeof _MotionFlex> {}
const _MotionFlex = motionEnhance(Flex)
export const MotionFlex: IMotionFlex = _MotionFlex

interface IMotionCenter extends BufferType<typeof _MotionCenter> {}
const _MotionCenter = motionEnhance(Center)
export const MotionCenter: IMotionCenter = _MotionCenter

interface IMotionBox extends BufferType<typeof _MotionBox> {}
const _MotionBox = motionEnhance(Box)
export const MotionBox: IMotionBox = _MotionBox

//Reference https://mobx-state-tree.js.org/tips/typescript optimization typesript
