import { Flex } from "@chakra-ui/react"
import { ComponentType } from "react"

type InferProps<T> = T extends ComponentType<infer A> ? A : never

interface FlexProps extends InferProps<typeof Flex> {}
export const FlexColumn = (props: FlexProps) => <Flex direction="column" justify="space-around" {...props} />
