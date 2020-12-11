import { MotionBox } from "@ui/common"
import { mapIter } from "@utils/iterable-fns"
import { observer } from "mobx-react-lite"
import { IBlocks, IBlock } from "@main/controllers"
import { Block } from "./Block"
import { useBlocksState } from "./use-blocks-state"
import { BlockDragShadow } from "./BlockDragShadow"

export const Blocks = observer(({ blocks }: { blocks: IBlocks }) => {
  const { motionOffset, dimensions, composition, min } = useBlocksState()
  const { blockDrag } = composition

  if (motionOffset) {
    return (
      <MotionBox position="absolute" style={motionOffset} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <MotionBox position="absolute" bg="coolGray.400" opacity={0.5} sx={dimensions} style={min} />
        {mapIter(blocks.values(), (block: IBlock) => (
          <Block key={block._id} block={block} />
        ))}
        {blockDrag && <BlockDragShadow block={blockDrag} />}
      </MotionBox>
    )
  } else return null
})
