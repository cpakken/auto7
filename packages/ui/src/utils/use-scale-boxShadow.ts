import { useTheme } from "@chakra-ui/react"
import { useMotionValue, useTransform } from "framer-motion"

export function useScaleBoxShadowValues(scaleValue: number) {
  const { shadows } = useTheme()
  const scale = useMotionValue(1)
  const boxShadow = useTransform(scale, [1, scaleValue], [shadows.none2, shadows.md])

  return { scale, boxShadow }
}
