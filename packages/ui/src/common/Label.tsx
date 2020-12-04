import { chakraEnhance } from "./chakra-enhance"

export const Label = chakraEnhance("div", {
  baseStyle: ({ colorScheme }) => ({
    color: `${colorScheme}.600`,
    fontWeight: "bold",
    // fontSize: "lg",
    fontSize: "sm",
  }),
  defaultProps: { colorScheme: "coolGray" },
})
