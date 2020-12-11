import { chakraEnhance } from "@utils/chakra-enhance"

export const Label = chakraEnhance("div", {
  baseStyle: ({ colorScheme }) => ({
    color: `${colorScheme}.500`,
    fontWeight: "bold",
    whiteSpace: "nowrap",
  }),
  sizes: {
    xs: { fontSize: "xs" },
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
  defaultProps: { colorScheme: "blueGray", size: "xs" },
})
