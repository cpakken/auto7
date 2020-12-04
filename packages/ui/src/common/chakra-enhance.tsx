import { chakra, SystemStyleObject, ChakraComponent, useColorMode, useTheme, ColorMode } from "@chakra-ui/react"
import { ComponentType, ElementType, useMemo } from "react"

type StyleInterpolation = SystemStyleObject | ((options: StyleOptions) => SystemStyleObject)
type Theme = { [keys: string]: any }

interface StyleOptions {
  theme: Theme
  colorMode: "light" | "dark"
  colorScheme: string
}

export interface StyleConfig {
  baseStyle?: StyleInterpolation
  sizes?: { [size: string]: StyleInterpolation }
  variants?: { [variant: string]: StyleInterpolation }
  defaultProps?: {
    variant?: string
    size?: string
    colorScheme?: string
  }
}

type ThemeProps = { size?: string; variant?: string; colorScheme?: string; colorMode: ColorMode; theme: Theme }

export function chakraEnhance<P extends { [key: string]: any }>(ElementType: ElementType<P>, styles: StyleConfig) {
  const { baseStyle, sizes, variants, defaultProps } = styles

  //TODO
  //const Chakra = isChakraComponent(ElementType) ? ElementType : chakra(ElementType)
  const Chakra = chakra(ElementType) as any

  const getSx = (themeProps: ThemeProps) => {
    const { size, variant } = themeProps
    return {
      ...(baseStyle && evalStyle(baseStyle, themeProps)),
      ...(sizes && size && evalStyle(sizes[size], themeProps)),
      ...(variants && variant && evalStyle(variants[variant], themeProps)),
    }
  }

  //Naming here is important for react-refresh to work
  const Enhanced = (({ sx, ...rest }) => {
    const { size, variant, colorScheme } = rest as any

    const themeProps = {
      ...defaultProps,
      size,
      variant,
      colorScheme,
      colorMode: useColorMode().colorMode,
      theme: useTheme(),
    }

    const enhancedSx = useMemo(() => getSx(themeProps), Object.values(themeProps))

    return <Chakra sx={{ ...enhancedSx, ...sx }} {...rest} />
  }) as ChakraComponent<ComponentType<P>, P>

  return Enhanced
}

function evalStyle(style: StyleInterpolation, props) {
  return style instanceof Function ? style(props) : style
}

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
