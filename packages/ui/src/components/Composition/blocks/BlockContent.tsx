import { observer } from "mobx-react-lite"
import { Label } from "@ui/library"
import { Box } from "@ui/common"
import { BlockState } from "./use-block-state"

export const BlockContent = observer(({ state }: { state: BlockState }) => {
  const { inputs, outputs, label } = state.block.logic.info!

  return (
    <Box>
      <Label sx={{ h: 6, pt: 1 }} variant="center">
        {label}
      </Label>
    </Box>
  )
})
