import { createMotionBox } from "@ui/utils/hoc"

export const NodeConnector = createMotionBox({
  baseStyle: {
    bg: "blueGray.400",
    position: "absolute",
    zIndex: "connector",
  },
  variants: {
    left: { left: 0, transform: "translateX(-100%)", borderLeftRadius: "full" },
    right: { right: 0, transform: "translateX(100%)", borderRightRadius: "full" },
  },
  sizes: {
    md: { w: "25px", h: "20px" },
    sm: { w: "20px", h: "15px" },
  },
  defaultProps: { size: "md" },
})
