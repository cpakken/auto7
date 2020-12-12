import { observer } from "mobx-react-lite"
import { createBox } from "@ui/utils/hoc"
import { MotionBox } from "@ui/common"
import { useCompositionState, CompositionContext, CompositionState } from "./use-composition-state"
import { Blocks } from "./blocks"

export const Composition = observer(({ _state }: { _state?: CompositionState }) => {
  const state = _state ?? useCompositionState()
  const { ref, border, composition } = state
  const { blocks } = composition

  return (
    <CompositionContext.Provider value={state}>
      <CompositionContainer ref={ref}>
        {border && (
          <CompositionContentContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Blocks blocks={blocks} />
            {/* Paths */}
          </CompositionContentContainer>
        )}
      </CompositionContainer>
    </CompositionContext.Provider>
  )
})

const CompositionContainer = createBox({
  baseStyle: { w: "full", h: "full", bg: "blueGray.300", position: "relative", userSelect: "none" },
})

const CompositionContentContainer = MotionBox
