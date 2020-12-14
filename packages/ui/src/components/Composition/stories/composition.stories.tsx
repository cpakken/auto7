import { Meta } from "@storybook/react/types-6-0"
import { Box } from "@ui/common"
import { createTestControllers } from "@main/test-utils"
import { Composition } from "../Composition"
import { useComposerState, ComposerContext } from "src/components/Composer/use-composer-state"
import { LogicComposedShallowReady } from "@main/controllers"
import { useConstant } from "@utils/react"

const createADDSTRING = () => {
  const { logic } = createTestControllers()
  return logic.composed.get("ADDSTRING_COMPOUND") as LogicComposedShallowReady
}

export const Primary = () => {
  const state = useComposerState(useConstant(createADDSTRING))

  return (
    <Box ref={state.ref} w={1000} h={600}>
      <ComposerContext.Provider value={state}>
        <Composition />
      </ComposerContext.Provider>
    </Box>
  )
}

// export const Blocks_ = () => {
//   const { composition } = useConstant(createADDSTRING)
//   const { blocks } = composition!

//   const compositionState = useCompositionState(composition!)

//   return (
//     <CompositionContext.Provider value={compositionState}>
//       <Blocks blocks={blocks} />
//     </CompositionContext.Provider>
//   )
// }

export default {
  title: "UI/Composition",
  // decorators: [(Story) => <Box>{Story()}</Box>],
} as Meta
