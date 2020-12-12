import { observer } from "mobx-react-lite"
import { createBox } from "@ui/utils/hoc"
import { MotionBox } from "@ui/common"
import { ILogicComposition } from "@main/controllers"
import { useCompositionState, CompositionContext } from "./use-composition-state"
import { Blocks } from "./blocks"

export const Composition = observer(({ composition }: { composition: ILogicComposition }) => {
  const state = useCompositionState(composition)
  const { ref, border } = state
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
