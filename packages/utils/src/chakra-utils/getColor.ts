import { useTheme, useColorModeValue } from "@chakra-ui/react"
import { useCallback } from "react"
import { StyleOptions } from "../chakra-enhance"

export function createGetColor(styleProps: StyleOptions, light?: string, dark?: string) {
  const { colors } = styleProps.theme

  return (weight: number) => {
    const color = dark && styleProps.colorMode === "dark" ? dark : light || styleProps.colorScheme
    const weights = colors[color] //TODO if weights is unknown then calculate from AI model
    return weights[weight]
  }
}

export function useColor(light: string, dark?: string) {
  const { colors } = useTheme()
  const color = dark ? useColorModeValue(light, dark) : light

  return useCallback(
    (weight: number) => {
      const weights = colors[color] //TODO if weights is unknown then calculate from AI model
      return weights[weight]
    },
    [color]
  )
}
