import { MotionBox } from "@ui/common"
import { mapIter } from "@utils/iterable-fns"
import { observer } from "mobx-react-lite"
import { IBlocks, IBlock } from "@main/controllers"
import { Block } from "./Block"
import { useBlocksState } from "./use-blocks-state"
import { BlockState, gridToValue, valueToGrid } from "./use-block-state"
import { useSpring, useTransform } from "framer-motion"

export const Blocks = observer(({ blocks }: { blocks: IBlocks }) => {
  const { motionOffset, dimensions, composition } = useBlocksState()
  const { blockDrag } = composition

  return (
    <MotionBox position="absolute" bg="coolGray.600" sx={dimensions} style={motionOffset}>
      {mapIter(blocks.values(), (block: IBlock) => (
        <Block key={block._id} block={block} />
      ))}
      {blockDrag && <BlockDragShadow block={blockDrag} />}
    </MotionBox>
  )
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

  const config = { damping: 25, stiffness: 350 }
  return {
    x: useSpring(position.x, config),
    y: useSpring(position.y, config),
  }
}

export const BlockDragShadow = ({ block }: { block: BlockState }) => {
  const { width, height } = block
  const position = useBlockDragShadowState(block)

  return <MotionBox sx={{ width, height, bg: "red.600", position: "absolute" }} style={position} />
}
