import { createMotionBox } from "@ui/utils/hoc"
import { BlockState, gridToValue, valueToGrid } from "./use-block-state"
import { useSpring, useTransform } from "framer-motion"

export const BlockDragShadow = ({ block }: { block: BlockState }) => {
  const { width, height } = block
  const position = useBlockDragShadowState(block)

  return (
    <BlockDragShadowWrapper
      sx={{ width, height }}
      style={position}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.1 } }}
      exit={{ opacity: 0 }}
    />
  )
}

const BlockDragShadowWrapper = createMotionBox({
  baseStyle: {
    position: "absolute",
    border: "3px dashed",
    // borderColor: "rose.500",
    // borderColor: "blueGray.500",
    borderColor: "violet.500",
    borderRadius: "lg",
  },
})

function useBlockDragShadowState(block: BlockState) {
  const { motionXY } = block
  const grid = {
    x: useTransform(motionXY.x, valueToGrid),
    y: useTransform(motionXY.y, valueToGrid),
  }
  const position = {
    x: useTransform(grid.x, gridToValue),
    y: useTransform(grid.y, gridToValue),
  }

  const config = { damping: 25, stiffness: 400 }
  return {
    x: useSpring(position.x, config),
    y: useSpring(position.y, config),
  }
}
