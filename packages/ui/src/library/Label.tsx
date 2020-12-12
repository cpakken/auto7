import { createBox } from "@ui/utils/hoc"

export const Label = createBox({
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
  defaultProps: { colorScheme: "blueGray", size: "sm" },
})
