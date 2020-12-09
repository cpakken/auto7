import { useTheme } from "@chakra-ui/react"
import { useMotionValue, useTransform } from "framer-motion"

export function useScaleBoxShadowValues() {
  const { shadows } = useTheme()
  const scale = useMotionValue(1)
  const boxShadow = useTransform(scale, [1, 1.06], [shadows.none2, shadows.md])

  return { scale, boxShadow }
}
