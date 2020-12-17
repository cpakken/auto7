import { MotionBox } from "@ui/common"
import { useMotionValue } from "framer-motion"
import { createMotionBox } from "src/utils/hoc"
import { useMotionDrag, useScrollControls } from "@ui/utils/use-motion-drag"

const gridSize = 30

// @refresh reset
export const DragBox = () => {
  const xy = { x: useMotionValue(15 * gridSize), y: useMotionValue(15 * gridSize) }
  const offset = { x: useMotionValue(-10 * gridSize), y: useMotionValue(-10 * gridSize) }

  const { increase, decrease, stop } = useScrollControls(offset.x, { min: 200, max: 450, buffer: 100 })

  const cx = {
    // onMinStart: increase,
    onMin: increase,
    // onMaxStart: decrease,
    onMax: decrease,
    onMinEnd: stop,
    onMaxEnd: stop,
  }

  const constraints = {
    x: { min: 0, max: 1000 - 3 * gridSize, ...cx },
    y: { min: 0, max: 700 - 3 * gridSize },
  }

  const dragControls = useMotionDrag(xy, { offset, constraints })

  return (
    <OffsetBox style={offset}>
      <MotionBox
        {...dragControls}
        whileTap={{ scale: 1.1 }}
        sx={{ w: 3 * gridSize, h: 3 * gridSize, bg: "red.600", borderRadius: "xl", position: "absolute" }}
        style={xy}
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
