import { Box } from "@ui/common"
import { DragBox } from "./DragBox"

export const Primary = () => {
  return (
    <Box sx={{ w: 1000, h: 700, bg: "coolGray.200", position: "relative" }}>
      <DragBox />
    </Box>
  )
}

export default {
  title: "Sandbox/Motion-Drag",
}
