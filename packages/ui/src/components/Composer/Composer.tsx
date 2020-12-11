import { Box } from "@ui/common"
import { LogicComposed, isShallowReady } from "@main/controllers"
import { IO } from "@ui/components/IO"
import { Composition } from "../Composition"

export const Composer = ({ composed }: { composed: LogicComposed }) => {
  if (!isShallowReady(composed)) return <div>"Loading"</div>
  const { inputs, outputs } = composed.info

  return (
    <Box sx={{ bg: "blueGray.700", w: "full", h: "full", position: "relative" }}>
      <Composition composition={composed.composition} />
      <IO ioType="in" io={inputs} />
      <IO ioType="out" io={outputs} />
    </Box>
  )
}
