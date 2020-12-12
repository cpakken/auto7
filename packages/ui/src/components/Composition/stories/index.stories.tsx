import { Meta } from "@storybook/react/types-6-0"
import { Box } from "@ui/common"
import { createTestControllers } from "@main/test-utils"
import { Composition } from "../Composition"
import { useComposerState } from "src/components/Composer/use-composer-state"
import { LogicComposedShallowReady } from "@main/controllers"
import { useCompositionState } from "../use-composition-state"

const createADDSTRING = () => {
  const { logic } = createTestControllers()
  return logic.composed.get("ADDSTRING_COMPOUND")
}

export const Primary = () => {
  const composer = useComposerState(createADDSTRING() as LogicComposedShallowReady)
  const state = useCompositionState(composer)

  return <Composition _state={state} />
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
  decorators: [(Story) => <Box sx={{ w: 800, h: 600 }}>{Story()}</Box>],
} as Meta
