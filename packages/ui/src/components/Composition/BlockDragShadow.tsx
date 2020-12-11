import { motionChakraDiv } from "@ui/common"
import { BlockState, gridToValue, valueToGrid } from "./use-block-state"
import { useSpring, useTransform } from "framer-motion"

const BlockDragShadowWrapper = motionChakraDiv({
  baseStyle: {
    // bg: "red.600",
    position: "absolute",
    border: "3px dashed red",
    borderRadius: "lg",
  },
})

export const BlockDragShadow = ({ block }: { block: BlockState }) => {
  const { width, height } = block
  const position = useBlockDragShadowState(block)

  return <BlockDragShadowWrapper sx={{ width, height }} style={position} />
}

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
