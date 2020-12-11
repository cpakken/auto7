import { IBlock } from "@main/controllers"
import { observer } from "mobx-react-lite"
import { Label } from "@ui/library"
import { motionChakraDiv } from "@ui/common/motion-chakra"
import { useBlockState } from "./use-block-state"
import { useScaleBoxShadowValues } from "@ui/utils"

const BlockWrapper = motionChakraDiv({
  baseStyle: {
    bg: "coolGray.200",
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
  const { inputs, outputs, label } = block.logic.info!
  const { width, height, motionXY, onHoverStart, onHoverEnd, onDragEnd, onDragStart, isHover, isDrag } = useBlockState(block)
  const { boxShadow, scale } = useScaleBoxShadowValues()

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
      <Label sx={{ bg: "coolGray.300", h: 6, fontSize: "xs", pt: 1, whiteSpace: "nowrap" }} variant="center">
        {label}
      </Label>
    </BlockWrapper>
  )
})
