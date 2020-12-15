import { MotionBox } from "@ui/common"
import { useMotionValue } from "framer-motion"
import { useMotionDrag } from "src/utils/use-motion-drag"

// @refresh reset
export const DragBox = () => {
  const x = useMotionValue(25)
  const y = useMotionValue(25)
  const { onPanStart, onPanEnd, onPan } = useMotionDrag(
    { x, y },
    {
      constraints: {
        x: { min: 0, max: 1000 - 70 },
        y: { min: 0, max: 700 - 70 },
      },
    }
  )

  return (
    <MotionBox
      // onTapCancel={onDragEnd}
      onPanStart={onPanStart}
      onPanEnd={onPanEnd}
      onPan={onPan}
      whileTap={{ scale: 1.1 }}
      sx={{ w: 70, h: 70, bg: "coolGray.600", borderRadius: "xl", position: "absolute" }}
      style={{ x, y }}
    />
  )
}
