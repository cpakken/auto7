import { Meta } from "@storybook/react/types-6-0"
import { Box } from "@ui/common"
import { createTestControllers } from "@main/test-utils"
import { Composition } from "../Composition"
import { useComposerState, ComposerContext } from "src/components/Composer/use-composer-state"
import { LogicComposedShallowReady } from "@main/controllers"
import { useConstant } from "@utils/react"
import { useRef } from "react"

const createADDSTRING = () => {
  const { logic } = createTestControllers()
  return logic.composed.get("ADDSTRING_COMPOUND") as LogicComposedShallowReady
}

export const Primary = () => {
  const ref = useRef(null)
  const state = useComposerState(ref, useConstant(createADDSTRING))

  return (
    <Box ref={ref} w={1000} h={600}>
      {state && (
        <ComposerContext.Provider value={state}>
          <Composition />
        </ComposerContext.Provider>
      )}
    </Box>
  )
}

export default {
  title: "UI/Composition",
  // decorators: [(Story) => <Box>{Story()}</Box>],
} as Meta
