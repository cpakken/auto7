import { Flex as _Flex, Box as _Box } from "@chakra-ui/react"

type BufferType<T> = T

interface IBox extends BufferType<typeof _Box> {}
export const Box: IBox = _Box

interface IFlex extends BufferType<typeof _Flex> {}
export const Flex: IFlex = _Flex
