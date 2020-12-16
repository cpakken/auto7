import { MotionBox } from "@ui/common"
import { useMotionValue } from "framer-motion"
import { createMotionBox } from "src/utils/hoc"
import { useMotionDrag } from "src/utils/use-motion-drag"

const gridSize = 30

// @refresh reset
export const DragBox = () => {
  const drag = { x: useMotionValue(15 * gridSize), y: useMotionValue(15 * gridSize) }
  const offset = { x: useMotionValue(-10 * gridSize), y: useMotionValue(-10 * gridSize) }
  const scroll = { x: {}, y: {} }

  const constraints = { x: { min: 0, max: 1000 - 3 * gridSize }, y: { min: 0, max: 700 - 3 * gridSize } }

  const panHandlers = useMotionDrag(drag, { constraints, offset, scroll })
  // const panHandlers = useMotionDrag(drag, { constraints, offset })

  return (
    <OffsetBox style={offset}>
      <MotionBox
        {...panHandlers}
        whileTap={{ scale: 1.1 }}
        sx={{ w: 3 * gridSize, h: 3 * gridSize, bg: "red.600", borderRadius: "xl", position: "absolute" }}
        style={drag}
      />
    </OffsetBox>
  )
}

const OffsetBox = createMotionBox({
  baseStyle: {
    position: "absolute",
    w: gridSize * 50,
    h: gridSize * 50,
    backgroundSize: `${gridSize}px ${gridSize}px`,
    backgroundImage: [
      "linear-gradient(to right, black 1px, transparent 1px)",
      "linear-gradient(to bottom, black 1px, transparent 1px)",
      // "linear-gradient( rgba(0, 0, 0, 0.4) 100%, rgba(0, 0, 0, 0.4) 100%)",
    ].join(","),
  },
})
