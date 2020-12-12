import { chakra, ChakraComponent, As } from "@chakra-ui/react"
import { forwardRef, ComponentType, FunctionComponent } from "react"
import { StyleConfig, createStyleConfigHook } from "./create-style-config-hook"

export type ChakraEnhanced<T extends As = As> = ChakraComponent<T, { variant?: string; size?: string }> & { config: StyleConfig }

//For non chakra components
export function chakraEnhance<E extends As>(ElementType: E, config: StyleConfig) {
  const useStyleConfig = createStyleConfigHook(config)
  const Chakra = chakra(ElementType) as any

  const Enhanced = forwardRef((props: any, ref) => {
    const configSx = useStyleConfig(props)

    //Pull colorSheme out since chakra() @chakra-ui/system shouldForwardProp -> should contain colorScheme
    const { colorScheme, ...rest } = props
    return <Chakra ref={ref} __css={configSx} {...rest} />
  }) as any

  return Object.assign(Enhanced, { config }) as ChakraEnhanced<E>
}

export type ChakraExtend<C extends ChakraComponent<As>> = FunctionComponent<PropsOf<C> & { variant?: string; size?: string }> & {
  config: StyleConfig
}
//For chakra components
export function chakraExtend<C extends ChakraComponent<As>>(Chakra: C, config: StyleConfig) {
  const useStyleConfig = createStyleConfigHook(config)

  const Enhanced = forwardRef((props: any, ref) => {
    const configSx = useStyleConfig(props)

    // const { colorScheme, sx, ...rest } = props
    const { sx, ...rest } = props
    return <Chakra ref={ref} {...config.defaultProps} sx={{ ...configSx, ...sx }} {...rest} />
  }) as any

  return Object.assign(Enhanced, { config }) as ChakraExtend<C>
}

type PropsOf<C> = C extends ComponentType<infer T> ? T : never
