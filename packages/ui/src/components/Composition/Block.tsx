import { IBlock } from "@main/controllers"
import { observer } from "mobx-react-lite"
import { Label } from "@ui/library"
import { chakraEnhance } from "@utils/chakra-enhance"
import { motionEnhance } from "@utils/motion"
import { useBlockState } from "./use-block-state"
import { useScaleBoxShadowValues } from "@ui/utils"

const BlockWrapper = motionEnhance(
  chakraEnhance("div", {
    baseStyle: {
      bg: "coolGray.200",
      borderRadius: "lg",
      position: "absolute",
      overflow: "hidden",
    },
  })
)

export const Block = observer(({ block }: { block: IBlock }) => {
  const { inputs, outputs, label } = block.logic.info!
  const { width, height, motionXY, onHoverStart, onHoverEnd, onDragEnd, onDragStart, isHover, isDrag } = useBlockState(block)
  const { boxShadow, scale } = useScaleBoxShadowValues()

  const enable = isHover || isDrag

  return (
    <BlockWrapper
      drag={enable}
      dragMomentum={false}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      sx={{ width, height }}
      animate={{ scale: enable ? 1.06 : 1 }}
      style={{ scale, boxShadow, ...motionXY, zIndex: enable ? 10 : 1 }}
    >
      <Label sx={{ bg: "coolGray.300", h: 6, fontSize: "xs", pt: 1, whiteSpace: "nowrap" }} variant="center">
        {label}
      </Label>
    </BlockWrapper>
  )
})
