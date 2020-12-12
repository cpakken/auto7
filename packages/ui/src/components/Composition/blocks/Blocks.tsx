import { AnimatePresence } from "framer-motion"
import { observer } from "mobx-react-lite"
import { mapIter } from "@utils/iterable-fns"
import { MotionBox } from "@ui/common"
import { createMotionBox } from "@ui/utils/hoc"
import { IBlocks, IBlock } from "@main/controllers"
import { useBlocksState } from "./use-blocks-state"
import { Block } from "./Block"
import { BlockDragShadow } from "./BlockDragShadow"

export const Blocks = observer(({ blocks }: { blocks: IBlocks }) => {
  const { motionOffset, dimensions, composition, min } = useBlocksState()
  const { blockDrag } = composition

  if (motionOffset) {
    return (
      <MotionBox position="absolute" style={motionOffset} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <BlocksBackground layout sx={dimensions} style={min} />
        {mapIter(blocks.values(), (block: IBlock) => (
          <Block key={block._id} block={block} />
        ))}
        <AnimatePresence>{blockDrag && <BlockDragShadow block={blockDrag} />}</AnimatePresence>
      </MotionBox>
    )
  } else return null
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
