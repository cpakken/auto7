import { SystemStyleObject, ColorMode, useChakra } from "@chakra-ui/react"
import { useMemo } from "react"

export type StyleInterpolation = SystemStyleObject | ((options: StyleOptions) => SystemStyleObject)
export type Theme = { colors: { [color: string]: string }; [keys: string]: any }
export interface StyleOptions {
  theme: Theme
  colorMode: ColorMode
  colorScheme: string
}

function evalStyle(style: StyleInterpolation | undefined, props) {
  return style instanceof Function ? style(props) : style
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

interface StyleConfigProps {
  size?: string
  variant?: string
  colorScheme?: string
}

export function createStyleConfigHook({ baseStyle, sizes, variants, defaultProps }: StyleConfig) {
  return function useStyleConfig({ size, variant, colorScheme }: StyleConfigProps = {}) {
    const { colorMode, theme } = useChakra()
    const styleProps = {
      size: size ?? defaultProps?.size,
      variant: variant ?? defaultProps?.variant,
      colorScheme: colorScheme ?? defaultProps?.colorScheme,
      colorMode,
      theme,
    }

    return useMemo(
      () => ({
        ...evalStyle(baseStyle, styleProps),
        ...evalStyle(sizes?.[styleProps.size!], styleProps),
        ...evalStyle(variants?.[styleProps.variant!], styleProps),
      }),
      Object.values(styleProps)
    )
  }
}
