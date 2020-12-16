import { MotionBox } from "@ui/common"
import { useMotionValue } from "framer-motion"
import { createMotionBox } from "src/utils/hoc"
import { useMotionDrag, useScrollControls } from "@ui/utils/use-motion-drag"

const gridSize = 30

// @refresh reset
export const DragBox = () => {
  const drag = { x: useMotionValue(15 * gridSize), y: useMotionValue(15 * gridSize) }
  const offset = { x: useMotionValue(-10 * gridSize), y: useMotionValue(-10 * gridSize) }

  const { increase, decrease, stop } = useScrollControls(offset.x)

  //TODO hook increaes to onMin instead of onMinStart to get deltaMax
  const cx = { onMinStart: increase, onMaxStart: decrease, onMinEnd: stop, onMaxEnd: stop }

  const constraints = {
    x: { min: 0, max: 1000 - 3 * gridSize, ...cx },
    y: { min: 0, max: 700 - 3 * gridSize },
  }

  const pan = useMotionDrag(drag, { constraints, offset })

  return (
    <OffsetBox style={offset}>
      <MotionBox
        {...pan}
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
