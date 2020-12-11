import { extendTheme, ChakraProvider, ColorModeProvider, ColorModeScript } from "@chakra-ui/react"
import colors from "./colors"

const customTheme = extendTheme({
  colors,
  shadows: {
    none1: "0 0px 0px 0px rgba(0, 0, 0, 0)",
    none2: "0 0px 0px 0px rgba(0, 0, 0, 0), 0 0px 0px 0px rgba(0, 0, 0, 0)",
  },
  styles: {
    global: {
      body: { fontFamily: "Inter, sans-serif" },
    },
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
})

export const StorybookDecorator = (Story) => (
  <ChakraProvider theme={customTheme}>
    {/* <ColorModeScript initialColorMode="light" /> */}
    {Story()}
  </ChakraProvider>
)

export default customTheme
