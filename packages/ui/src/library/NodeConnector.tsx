import { createMotionBox } from "@ui/utils/hoc"

export const NodeConnector = createMotionBox({
  baseStyle: {
    bg: "blueGray.400",
    w: "50px",
    h: "20px",
    borderRadius: "full",
    position: "absolute",
    zIndex: "connector",
  },
  variants: {
    left: { left: 0, transform: "translateX(-50%)" },
    right: { right: 0, transform: "translateX(50%)" },
  },
})
