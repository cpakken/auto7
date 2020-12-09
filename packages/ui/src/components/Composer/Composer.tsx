import { Box } from "@ui/common"
import { LogicComposed, isShallowReady } from "@main/controllers"
import { IO } from "@ui/components/IO"

export const Composer = ({ composed }: { composed: LogicComposed }) => {
  if (!isShallowReady(composed)) return <div>"Loading"</div>
  const { inputs, outputs } = composed.info

  return (
    <Box sx={{ bg: "coolGray.300", w: "full", h: "full", position: "relative" }}>
      <IO ioType="in" io={inputs} />
      <IO ioType="out" io={outputs} />
    </Box>
  )
}
