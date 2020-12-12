import { extendTheme } from "@chakra-ui/react"
import colors from "./colors"

export const customTheme = extendTheme({
  colors,
  zIndices: {
    connector: 0,
    node: 10,
    block: 10,
    hover: 15,
    drag: 20,
    //   hide: -1,
    //   auto: "auto",
    //   base: 0,
    //   docked: 10,
    //   dropdown: 1000,
    //   sticky: 1100,
    //   banner: 1200,
    //   overlay: 1300,
    //   modal: 1400,
    //   popover: 1500,
    //   skipLink: 1600,
    //   toast: 1700,
    //   tooltip: 1800,
  },
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
