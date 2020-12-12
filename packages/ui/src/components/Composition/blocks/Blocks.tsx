import { AnimatePresence } from "framer-motion"
import { observer } from "mobx-react-lite"
import { mapIter } from "@utils/iterable-fns"
import { MotionBox } from "@ui/common"
import { createMotionBox } from "@ui/utils/hoc"
import { IBlocks, IBlock } from "@main/controllers"
import { Block } from "./Block"
import { BlockDragShadow } from "./BlockDragShadow"
import { useParentCompositionState } from "../use-composition-state"

export const Blocks = observer(({ blocks }: { blocks: IBlocks }) => {
  const { motionOffset, dimensions, blockDrag, min } = useParentCompositionState()

  return (
    <MotionBox position="absolute" style={motionOffset!}>
      <BlocksBackground layout sx={dimensions} style={min} />
      {mapIter(blocks.values(), (block: IBlock) => (
        <Block key={block._id} block={block} />
      ))}
      <AnimatePresence>{blockDrag && <BlockDragShadow block={blockDrag} />}</AnimatePresence>
    </MotionBox>
  )
})

const BlocksBackground = createMotionBox({
  baseStyle: {
    position: "absolute",
    bg: "blueGray.400",
    opacity: 0.2,
    borderRadius: "lg",
    boxSizing: "content-box",
    p: "25px",
    m: "-25px",
  },
})
