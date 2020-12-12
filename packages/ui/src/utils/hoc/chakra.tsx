import { StyleConfig, chakraEnhance, chakraExtend, ChakraEnhanced, ChakraExtend } from "@utils/chakra-enhance"
import { Flex } from "@ui/common"

export interface IChakraDiv extends ChakraEnhanced<"div"> {}
export function createBox(styleConfig: StyleConfig) {
  const ChakraDiv = chakraEnhance("div", styleConfig) as any
  return ChakraDiv as IChakraDiv
}

export interface IChakraFlex extends ChakraExtend<typeof Flex> {}
export function createFlex(styleConfig: StyleConfig) {
  const ChakraFlex = chakraExtend(Flex, styleConfig) as any
  return ChakraFlex as IChakraFlex
}
