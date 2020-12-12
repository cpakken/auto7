import { observer } from "mobx-react-lite"
import { createBox } from "@ui/utils/hoc"
import { MotionBox } from "@ui/common"
import { useCompositionState, CompositionContext, CompositionState } from "./use-composition-state"
import { Blocks } from "./blocks"

export const Composition = observer(({ _state }: { _state?: CompositionState }) => {
  const state = _state ?? useCompositionState()
  const { ref, border, motionOffset, composition } = state

  return (
    <CompositionContext.Provider value={state}>
      <CompositionContainer ref={ref}>
        {border && (
          <CompositionContentContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <OffsetControl position="absolute" style={motionOffset!}>
              <Blocks blocks={composition.blocks} />
              {/* Paths */}
            </OffsetControl>
          </CompositionContentContainer>
        )}
      </CompositionContainer>
    </CompositionContext.Provider>
  )
})

const CompositionContainer = createBox({
  baseStyle: {
    w: "full",
    h: "full",
    bg: "blueGray.300",
    position: "relative",
    userSelect: "none",
    overflow: "hidden",
  },
})

// export const CompositionContent = observer(({ state }: { state: CompositionState }) => {
//   const { composition, motionOffset } = state
//   const { blocks } = composition

//   return (
//     <CompositionContentContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//       <OffsetControl position="absolute" style={motionOffset!}>
//         <Blocks blocks={blocks} />
//         {/* Paths */}
//       </OffsetControl>
//     </CompositionContentContainer>
//   )
// })

const CompositionContentContainer = MotionBox
const OffsetControl = MotionBox
