import { Meta } from "@storybook/react/types-6-0"
import { Box } from "@ui/common"
import { useConstant } from "@utils/react"
import { createTestControllers } from "@main/test-utils"
import { Composer } from "../Composer"

const createADDSTRING = () => {
  const { logic } = createTestControllers()
  return logic.composed.get("ADDSTRING_COMPOUND")
}

export const Primary = () => {
  const composed = useConstant(createADDSTRING)

  return <Composer composed={composed} />
}

export default {
  title: "UI/Composer",
  decorators: [(Story) => <Box sx={{ w: 800, h: 600 }}>{Story()}</Box>],
} as Meta
