import { ChakraProvider } from "@chakra-ui/react"
import { customTheme } from "./theme/custom-theme"

export const App = () => (
  <ChakraProvider theme={customTheme}>
    <div>Hello!!!</div>
    {/* <IOFoo /> */}
  </ChakraProvider>
)
