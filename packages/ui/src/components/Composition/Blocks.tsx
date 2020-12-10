import { MotionBox } from "@ui/common"
import { mapIter } from "@utils/iterable-fns"
import { observer, useLocalObservable } from "mobx-react-lite"
import { IBlocks, IBlock } from "@main/controllers"
import { Block } from "./Block"
import { useBlocksState } from "./use-blocks-state"
import { BlockState, gridToValue, valueToGrid } from "./use-block-state"
import { useSpring } from "framer-motion"
import { useEffect } from "react"
import { autorun } from "mobx"
import { useUnmountEffect } from "@utils/react"

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
  // const { motionXY } = block
  // const grid = {
  //   x: useTransform(motionXY.x, valueToGrid),
  //   y: useTransform(motionXY.y, valueToGrid),
  // }
  // const xy = {
  //   x: useTransform(grid.x, gridToValue),
  //   y: useTransform(grid.y, gridToValue),
  // }

  const { x, y } = block.motionXY
  const state = useLocalObservable(() => ({
    grid: { x: valueToGrid(x.get()), y: valueToGrid(y.get()) },
    get x() {
      return gridToValue(state.grid.x)
    },
    get y() {
      return gridToValue(state.grid.y)
    },
    setGrid(xy: "x" | "y", val) {
      const prev = state.grid[xy]
      if (prev !== val) state.grid[xy] = val
    },
  }))

  const xy = {
    x: useSpring(state.x, { damping: 25, stiffness: 300 }),
    y: useSpring(state.y, { damping: 25, stiffness: 300 }),
  }

  useEffect(() => {
    const disposer: (() => void)[] = []
    disposer.push(x.onChange((val) => state.setGrid("x", valueToGrid(val))))
    disposer.push(y.onChange((val) => state.setGrid("y", valueToGrid(val))))
    disposer.push(autorun(() => xy.x.set(state.x)))
    disposer.push(autorun(() => xy.y.set(state.y)))

    return () => disposer.forEach((d) => d())
  }, [])

  useUnmountEffect(() => block.setXY([state.grid.x, state.grid.y]))

  return xy
}

export const BlockDragShadow = ({ block }: { block: BlockState }) => {
  const { width, height } = block
  const xy = useBlockDragShadowState(block)

  return <MotionBox sx={{ width, height, bg: "red.600", position: "absolute" }} style={xy} />
}
