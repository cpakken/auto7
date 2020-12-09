import { chakraEnhance } from "@utils/chakra-enhance"
import { createGetColor } from "@utils/chakra-utils"

export const Input = chakraEnhance("input", {
  baseStyle: (props) => ({
    p: "2px",
    color: createGetColor(props)(600),
    fontWeight: "bold",
    outline: "none",
  }),
  variants: {
    filled: (props) => {
      const color = createGetColor(props)
      const accent = createGetColor(props, "violet")
      return {
        transitionDuration: "normal",
        bg: color(100),
        _hover: { bg: color(50) },
        _focus: {
          bg: color(50),
          boxShadow: `0 0 0 2px ${accent(400)}`,
        },
      }
    },
    unstyled: {
      bg: "transparent",
    },
  },
  sizes: {
    sm: { fontSize: "sm", borderRadius: "sm" },
    md: { fontSize: "md", borderRadius: "md" },
  },
  defaultProps: { colorScheme: "coolGray", size: "sm" },
})
