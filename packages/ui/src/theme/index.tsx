import { extendTheme, ChakraProvider, ColorModeProvider } from "@chakra-ui/react"
import colors from "./colors"

const customTheme = extendTheme({
  colors,
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
    <ColorModeProvider options={{ initialColorMode: "light", useSystemColorMode: false }}>
      <Story />
    </ColorModeProvider>
  </ChakraProvider>
)

export default customTheme
