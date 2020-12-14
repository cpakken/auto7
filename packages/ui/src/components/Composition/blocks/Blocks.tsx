import { AnimatePresence } from "framer-motion"
import { observer } from "mobx-react-lite"
import { mapIter } from "@utils/iterable-fns"
import { createMotionBox, createBox } from "@ui/utils/hoc"
import { IBlocks, IBlock } from "@main/controllers"
import { useParentCompositionState } from "../use-composition-state"
import { Block } from "./Block"
import { BlockDragShadow } from "./BlockDragShadow"
import { gridSize } from "./use-block-state"

export const Blocks = observer(({ blocks }: { blocks: IBlocks }) => {
  // const { dimensions, blockDrag, min } = useParentCompositionState()
  const { blockDrag } = useParentCompositionState()

  return (
    <div>
      {/* <BlocksBackground layout sx={dimensions} style={min} /> */}
      <Grid opacity={blockDrag ? 0.1 : 0} />
      {mapIter(blocks.values(), (block: IBlock) => (
        <Block key={block._id} block={block} />
      ))}
      <AnimatePresence>{blockDrag && <BlockDragShadow block={blockDrag} />}</AnimatePresence>
    </div>
  )
})

const Grid = createBox({
  baseStyle: {
    position: "absolute",
    w: gridSize * 50,
    h: gridSize * 50,
    m: -gridSize * 25,
    backgroundSize: `${gridSize}px ${gridSize}px`,
    backgroundImage: [
      "linear-gradient(to right, black 1px, transparent 1px)",
      "linear-gradient(to bottom, black 1px, transparent 1px)",
      "linear-gradient( rgba(0, 0, 0, 0.4) 100%, rgba(0, 0, 0, 0.4) 100%)",
    ].join(","),
    transitionProperty: "opacity",
    transitionDuration: "0.5s",
  },
})

const BlocksBackground = createMotionBox({
  baseStyle: {
    position: "absolute",
    bg: "blueGray.400",
    opacity: 0.2,
    borderRadius: "lg",
    boxSizing: "content-box",
    p: `${gridSize * 1}px`,
    m: `-${gridSize * 1}px`,
    // p: `${gridSize}px`,
    // m: `-${gridSize}px`,
  },
})
