import { IBlock } from "@main/controllers"
import { observer } from "mobx-react-lite"
import { MotionBox } from "@ui/common"
import { useBlockState } from "./use-block-state"
import { useScaleBoxShadowValues } from "@ui/utils/use-scale-boxShadow"
import { BlockContent } from "./BlockContent"

// const blockVariants = {
//   default: { scale: 1, opacity: 1, zIndex: "block" },
//   hover: { scale: 1.06, opacity: 1, zIndex: "hover" },
//   drag: { scale: 1.06, opacity: 0.85, zIndex: "drag" },
// }

const blockVariants = {
  default: { scale: 1, opacity: 1, zIndex: 10 },
  hover: { scale: 1.06, opacity: 1, zIndex: 15 },
  drag: { scale: 1.06, opacity: 0.85, zIndex: 20 },
}

export const Block = observer(({ block }: { block: IBlock }) => {
  const state = useBlockState(block)
  const { motionXY, onHoverStart, onHoverEnd, onDragEnd, onDragStart, isHover, isDrag } = state
  const { boxShadow, scale } = useScaleBoxShadowValues(1.06)

  const enable = isHover || isDrag
  const variant = isDrag ? "drag" : isHover ? "hover" : "default"

  return (
    <MotionBox
      drag={enable} // use own custom popmotion
      dragMomentum={false}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      animate={variant}
      variants={blockVariants}
      position="absolute"
      style={{ scale, boxShadow, ...motionXY }}
    >
      <BlockContent state={state} />
    </MotionBox>
  )
})
