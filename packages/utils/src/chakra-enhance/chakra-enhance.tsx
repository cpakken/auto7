import { chakra, ChakraComponent, As } from "@chakra-ui/react"
import { forwardRef, ComponentType, FunctionComponent } from "react"
import { StyleConfig, createStyleConfigHook } from "./create-style-config-hook"

//For non chakra components
export function chakraEnhance<E extends As, S extends StyleConfig>(ElementType: E, config: S) {
  const useStyleConfig = createStyleConfigHook(config)
  const Chakra = chakra(ElementType) as any

  const Enhanced = forwardRef((props: any, ref) => {
    const configSx = useStyleConfig(props)

    //Pull colorSheme out since chakra() @chakra-ui/system shouldForwardProp -> should contain colorScheme
    const { colorScheme, variant, size, ...rest } = props
    return <Chakra ref={ref} __css={configSx} {...rest} />
  }) as any

  return Object.assign(Enhanced, { config }) as ChakraEnhanced<E, S>
}

export type ChakraEnhanced<T extends As = As, S extends StyleConfig = StyleConfig> = ChakraComponent<
  T,
  { variant?: keyof S["variants"]; size?: keyof S["sizes"] }
> & { config: S }

//For chakra components
export function chakraExtend<C extends ChakraComponent<As>, S extends StyleConfig>(Chakra: C, config: S) {
  const useStyleConfig = createStyleConfigHook(config)

  const Extended = forwardRef((props: any, ref) => {
    const configSx = useStyleConfig(props)

    // const { colorScheme, sx, ...rest } = props
    const { sx, ...rest } = props
    return <Chakra ref={ref} {...config.defaultProps} sx={{ ...configSx, ...sx }} {...rest} />
  }) as any

  return Object.assign(Extended, { config }) as ChakraExtend<C, S>
}

export type ChakraExtend<C extends ChakraComponent<As>, S extends StyleConfig> = FunctionComponent<
  PropsOf<C> & { variant?: keyof S["variants"]; size?: keyof S["sizes"] }
> & { config: S }

export type PropsOf<C> = C extends ComponentType<infer T> ? T : never
