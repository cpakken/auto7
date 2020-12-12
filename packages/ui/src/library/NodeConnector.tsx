import { createMotionBox } from "@ui/utils/hoc"

export const NodeConnector = createMotionBox({
  baseStyle: {
    bg: "blueGray.400",
    borderRadius: "full",
    position: "absolute",
    zIndex: "connector",
  },
  variants: {
    left: { left: 0, transform: "translateX(-50%)" },
    right: { right: 0, transform: "translateX(50%)" },
  },
  sizes: {
    md: { w: "50px", h: "20px" },
    sm: { w: "40px", h: "15px" },
  },
  defaultProps: { size: "md" },
})
