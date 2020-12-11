import { IBlock } from "@main/controllers"
import { observer } from "mobx-react-lite"
import { Label } from "@ui/library"
import { Box } from "@ui/common"
import { createMotionChakraDiv } from "@ui/common/motion-chakra"
import { BlockState, useBlockState } from "./use-block-state"
import { useScaleBoxShadowValues } from "@ui/utils"

const BlockWrapper = createMotionChakraDiv({
  baseStyle: {
    bg: "blueGray.200",
    borderRadius: "lg",
    position: "absolute",
    overflow: "hidden",
  },
})
const blockAnimationVariants = {
  default: { scale: 1, opacity: 1, zIndex: 1 },
  hover: { scale: 1.06, opacity: 1, zIndex: 10 },
  drag: { scale: 1.06, opacity: 0.85, zIndex: 10 },
}

export const Block = observer(({ block }: { block: IBlock }) => {
  const state = useBlockState(block)
  const { width, height, motionXY, onHoverStart, onHoverEnd, onDragEnd, onDragStart, isHover, isDrag } = state
  const { boxShadow, scale } = useScaleBoxShadowValues()
  // const { inputs, outputs, label } = block.logic.info!

  const enable = isHover || isDrag
  const variant = isDrag ? "drag" : isHover ? "hover" : "default"

  return (
    <BlockWrapper
      drag={enable}
      dragMomentum={false}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      sx={{ width, height }}
      animate={variant}
      variants={blockAnimationVariants}
      style={{ scale, boxShadow, ...motionXY }}
    >
      <BlockContent state={state} />
    </BlockWrapper>
  )
})

export const BlockContent = observer(({ state }: { state: BlockState }) => {
  const { inputs, outputs, label } = state.block.logic.info!

  return (
    <Box>
      <Label sx={{ h: 6, pt: 1 }} variant="center">
        {label}
      </Label>
    </Box>
  )
})
