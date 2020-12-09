import { chakra, ChakraComponent, As } from "@chakra-ui/react"
import { forwardRef } from "react"
import { StyleConfig, createStyleConfigHook } from "./create-style-config-hook"

export type ChakraEnhanced<T extends As> = ChakraComponent<T, { variant?: string; size?: string }> & { config: StyleConfig }

//For non chakra components
export function chakraEnhance<T extends As>(ElementType: T, config: StyleConfig) {
  const useStyleConfig = createStyleConfigHook(config)
  const Chakra = chakra(ElementType) as any

  const Enhanced = forwardRef((props: any, ref) => {
    const configSx = useStyleConfig(props)

    //Pull colorSheme out since chakra() @chakra-ui/system shouldForwardProp -> should contain colorScheme
    const { colorScheme, ...rest } = props
    return <Chakra ref={ref} __css={configSx} {...rest} />
  }) as any

  return Object.assign(Enhanced, { config }) as ChakraEnhanced<T>
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

  return Object.assign(Enhanced, { config }) as C & { config: StyleConfig }
}

//own useStyleConfig created in a closure, since styleConfig doesn't change
//simplify since no multipart

//Proposal API modification to simplify -> merge ComponentStyles, chakra factory ( can be used to extend as well) , modularize theme component

//if all components changed to this initiation
// remove component styles from theme
// colorScheme can be in Provider and applies to all chakra children

//Was reading Component styles in docs
//Streamline API -> instead of disconnect of putting themeConfig into theme
//enhance chakra factory function to take entire config
//combine chakra factory + useStyleConfigHook
// show advantage by rewriting Button example in useStyleConfig hook with this
//remove one more step by using a "themeKey" -> no need for hook

//with this suggest move all  componentstyleConfig from theme to each respective component
//when developing, easier to prototype own component library look and feel
//users can easily extend Chakra's provided Components with this, only overwriting necessary styles

//reasons, theme is bloated with configs of all components. Even ones that are never used.
//as a UI framework, components should be modular. Consistent modular philosophy, component style configs should be contained within their own
//improved DX. hot module reloading, react fast refresh (ie storybook)

//weird importing. In theme folder needs to import all styleConfig of Components ( no longer modular)
//noticed all chakra components are created with chakra()  and useStyleConfig

//each time change component styleConfig -> triggers a full component reload since the entire theme object is changed in the ChakraProvider
//Suggest moving all component themes into their own construction
//new extending ChakraComponent api
//if users are extending components by extending the theme
//instead have chakraEnahnce() if it already is a chakra component, StyleConfig merged instead

//new features
//isChakraComponent use symbol
//config property -> nice DX, eg can extract variants and sizes Object.keys(config.sizes) to storybook

//Note: in useStyleConfig useMemo is being run everytime since mergedProps is a new object every render
// is stylesRef is unneeded if useMemo is done right. Computation is deterministic, same input,
// styleRef is already computed , does nothing
