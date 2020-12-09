import { extendTheme, ChakraProvider, ColorModeProvider } from "@chakra-ui/react"
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
  // config: {
  //   initialColorMode: "light",
  //   useSystemColorMode: false,
  // },
})

export const StorybookDecorator = (Story) => (
  <ChakraProvider theme={customTheme}>
    {/* <ColorModeProvider options={{ initialColorMode: "light", useSystemColorMode: false }}>{Story()}</ColorModeProvider> */}
    {Story()}
  </ChakraProvider>
)

export default customTheme
