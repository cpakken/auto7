import { chakraEnhance } from "@utils/chakra-enhance"

export const Label = chakraEnhance("div", {
  baseStyle: ({ colorScheme }) => ({
    color: `${colorScheme}.600`,
    fontWeight: "bold",
  }),
  sizes: {
    sm: { fontSize: "sm" },
    md: { fontSize: "md" },
  },
  variants: {
    center: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      h: "full",
    },
  },
  defaultProps: { colorScheme: "coolGray", size: "sm" },
})
