import { ChakraProvider } from "@chakra-ui/react"

import theme from "./theme"
// import { IOFoo } from "./components/IO"

export const App = () => (
  <ChakraProvider theme={theme}>
    <div>Hello!!!</div>
    {/* <IOFoo /> */}
  </ChakraProvider>
)
