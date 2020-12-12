import { StyleConfig, chakraEnhance, chakraExtend } from "@utils/chakra-enhance"
import { IBox, IFlex, Flex } from "@ui/common"

export function createBox(styleConfig: StyleConfig) {
  const ChakraDiv = chakraEnhance("div", styleConfig) as any
  return ChakraDiv as IBox
}

export function createFlex(styleConfig: StyleConfig) {
  const ChakraFlex = chakraExtend(Flex, styleConfig) as any
  return ChakraFlex as IFlex
}
