import { ChakraEnhanced } from "./chakra-enhance"

export function extractArgTypes<C extends ChakraEnhanced>({ config }: C) {
  const { sizes, variants, defaultProps } = config
  const size = sizes && {
    // control: { type: "select", options: Object.keys(sizes) },
    control: { type: "select", options: [...Object.keys(sizes), null] },
    defaultValue: defaultProps?.size,
  }
  const variant = variants && {
    // control: { type: "select", options: Object.keys(variants) },
    control: { type: "select", options: [...Object.keys(variants), null] },
    defaultValue: defaultProps?.variant,
  }
  return { size, variant }
}
