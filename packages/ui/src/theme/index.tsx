import { ChakraProvider, ColorModeProvider, ColorModeScript } from "@chakra-ui/react"
import { customTheme } from "./custom-theme"

export const StorybookDecorator = (Story) => (
  <ChakraProvider theme={customTheme}>
    {/* <ColorModeScript initialColorMode="light" /> */}
    {Story()}
  </ChakraProvider>
)

export default customTheme
