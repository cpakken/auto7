import { Box } from "@ui/common"
import { observer } from "mobx-react-lite"
import { ILogicComposition } from "@main/controllers"
import { useCompositionState, CompositionContext } from "./use-composition-state"
import { chakraEnhance } from "@utils/chakra-enhance"
import { Blocks } from "./Blocks"

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
