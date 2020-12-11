import { Flex as _Flex, Box as _Box, Center as _Center } from "@chakra-ui/react"

type BufferType<T> = T

interface IBox extends BufferType<typeof _Box> {}
export const Box: IBox = _Box

interface ICenter extends BufferType<typeof _Center> {}
export const Center: ICenter = _Center

interface IFlex extends BufferType<typeof _Flex> {}
export const Flex: IFlex = _Flex
