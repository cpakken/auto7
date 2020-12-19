import { MotionBox, Box } from "@ui/common"
import { useMotionValue } from "framer-motion"
import { createMotionBox } from "src/utils/hoc"
import {
  useMotionDrag,
  useScrollControls,
  DragConstraints,
  useScrollControlsToDragConstraintHooks,
  useScrollMoveOnWheelHandler,
} from "@ui/utils/use-motion-drag"

const gridSize = 30
const offsetLength = gridSize * 50

// @refresh reset
export const DragBox = () => {
  const xy = {
    x: useMotionValue(25 * gridSize),
    y: useMotionValue(25 * gridSize),
  }
  const offset = {
    x: useMotionValue(-10 * gridSize),
    y: useMotionValue(-10 * gridSize),
  }

  const sx = useScrollControls(offset.x, { max: gridSize, min: -offsetLength + gridSize })
  const sy = useScrollControls(offset.y, { max: gridSize, min: -offsetLength + gridSize })

  const cx = useScrollControlsToDragConstraintHooks(sx, { min: 200, max: 800, range: 140 })
  const cy = useScrollControlsToDragConstraintHooks(sy, { min: 200, max: 800, range: 140 })

  const constraints: DragConstraints = {
    x: { min: 0, max: 1000 - 3 * gridSize, ...cx },
    y: { min: 0, max: 700 - 3 * gridSize, ...cy },
  }

  const onTapStart = (e) => {
    e.stopPropagation()
    sx.stop()
    sy.stop()
  }

  const onDragEnd = () => {
    console.log("dragend?")
    sx.stop()
    sy.stop()
  }

  const dragControls = useMotionDrag(xy, { offset, constraints, onDragEnd })

  return (
    <Box
      onWheel={useScrollMoveOnWheelHandler({ x: sx, y: sy })}
      sx={{ w: 1000, h: 700, bg: "coolGray.200", position: "relative", overflow: "hidden" }}
    >
      <OffsetBox drag dragTransition={{ power: 0.65 }} style={offset}>
        <MotionBox
          {...dragControls}
          whileTap={{ scale: 1.1 }}
          onTapStart={onTapStart}
          sx={{ w: 3 * gridSize, h: 3 * gridSize, bg: "red.600", borderRadius: "xl", position: "absolute" }}
          style={xy}
        />
      </OffsetBox>
    </Box>
  )
}

const OffsetBox = createMotionBox({
  baseStyle: {
    position: "absolute",
    w: offsetLength,
    h: offsetLength,
    backgroundSize: `${gridSize}px ${gridSize}px`,
    backgroundImage: [
      "linear-gradient(to right, black 1px, transparent 1px)",
      "linear-gradient(to bottom, black 1px, transparent 1px)",
      // "linear-gradient( rgba(0, 0, 0, 0.4) 100%, rgba(0, 0, 0, 0.4) 100%)",
    ].join(","),
  },
})
