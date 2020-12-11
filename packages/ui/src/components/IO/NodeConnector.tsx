import { createMotionChakraDiv } from "@ui/common/motion-chakra"

export const NodeConnector = createMotionChakraDiv({
  baseStyle: {
    bg: "blueGray.400",
    w: "50px",
    h: "20px",
    borderRadius: "full",
    position: "absolute",
    zIndex: "base",
  },
  variants: {
    in: { right: 0, transform: "translateX(50%)" },
    out: { left: 0, transform: "translateX(-50%)" },
  },
})
