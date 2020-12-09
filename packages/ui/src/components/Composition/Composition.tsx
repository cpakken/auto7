import { Box, MotionBox } from "@ui/common"
import { mapIter } from "@utils/iterable-fns"
import { observer } from "mobx-react-lite"
import { ILogicComposition, IBlocks, IBlock } from "@main/controllers"
import { Block } from "./Block"
import { useCompositionState, CompositionContext } from "./use-composition-state"
import { useBlocksState } from "./use-blocks-state"
import { chakraEnhance } from "@utils/chakra-enhance"

export const Blocks = observer(({ blocks }: { blocks: IBlocks }) => {
  const { motionOffset, dimensions } = useBlocksState()

  return (
    <MotionBox position="absolute" bg="coolGray.600" sx={dimensions} style={motionOffset}>
      {mapIter(blocks.values(), (block: IBlock) => (
        <Block key={block._id} block={block} />
      ))}
    </MotionBox>
  )
})

const CompositionWrapper = chakraEnhance("div", {
  baseStyle: { w: "full", h: "full", position: "relative", userSelect: "none" },
})

export const Composition = observer(({ composition }: { composition: ILogicComposition }) => {
  const state = useCompositionState(composition)
  const { ref } = state
  const { blocks } = composition

  return (
    <CompositionContext.Provider value={state}>
      <Box
        ref={ref}
        sx={{
          w: "full",
          h: "full",
          position: "relative",
          userSelect: "none",
        }}
      >
        {/* {dimensions && <Blocks blocks={blocks}  />} */}
        <Blocks blocks={blocks} />
      </Box>
    </CompositionContext.Provider>
  )
})
