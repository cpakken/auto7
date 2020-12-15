import { useRef } from "react"
import { LogicComposed } from "@main/controllers"
import { Box } from "@ui/common"
import { IO } from "@ui/components/IO"
import { Composition } from "../Composition"
import { useComposerState, ComposerContext, ComposerState } from "./use-composer-state"

export const Composer = ({ composed }: { composed: LogicComposed }) => {
  const ref = useRef<HTMLDivElement>(null)
  const state = useComposerState(ref, composed)

  return (
    <Box ref={ref} sx={{ bg: "blueGray.700", w: "full", h: "full", position: "relative" }}>
      {state && <ComposerShallowLoaded state={state} />}
    </Box>
  )
}
export const ComposerShallowLoaded = ({ state }: { state: ComposerState }) => {
  return (
    <ComposerContext.Provider value={state}>
      <Composition />
      <IO ioType="in" />
      <IO ioType="out" />
    </ComposerContext.Provider>
  )
}
