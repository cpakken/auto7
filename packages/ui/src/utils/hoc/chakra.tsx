import { StyleConfig, chakraEnhance, chakraExtend, ChakraEnhanced, ChakraExtend } from "@utils/chakra-enhance"
import { Flex, Center } from "@ui/common"

export interface IChakraDiv<S extends StyleConfig> extends ChakraEnhanced<"div", S> {}
export function createBox<S extends StyleConfig>(styleConfig: S) {
  const ChakraDiv = chakraEnhance("div", styleConfig) as any
  return ChakraDiv as IChakraDiv<S>
}

export interface IChakraFlex<S extends StyleConfig> extends ChakraExtend<typeof Flex, S> {}
export function createFlex<S extends StyleConfig>(styleConfig: S) {
  const ChakraFlex = chakraExtend(Flex, styleConfig) as any
  return ChakraFlex as IChakraFlex<S>
}

export interface IChakraCenter<S extends StyleConfig> extends ChakraExtend<typeof Center, S> {}
export function createCenter<S extends StyleConfig>(styleConfig: S) {
  const ChakraCenter = chakraExtend(Center, styleConfig) as any
  return ChakraCenter as IChakraCenter<S>
}
