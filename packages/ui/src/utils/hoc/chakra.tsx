import { ChakraEnhanced, StyleConfig, chakraEnhance, chakraExtend } from "@utils/chakra-enhance"
import { IFlex, Flex } from "@ui/common"

export interface ChakraEnhancedDiv extends ChakraEnhanced<"div"> {}
export function createChakraDiv(styleConfig: StyleConfig) {
  const ChakraDiv = chakraEnhance("div", styleConfig) as any
  return ChakraDiv as ChakraEnhancedDiv
}

export function createChakraFlex(styleConfig: StyleConfig) {
  const ChakraFlex = chakraExtend(Flex, styleConfig) as any
  return ChakraFlex as IFlex
}
