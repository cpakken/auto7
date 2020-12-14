import { observer } from "mobx-react-lite"
import { createBox } from "@ui/utils/hoc"
import { MotionBox } from "@ui/common"
import { Blocks } from "./blocks"
import { useCompositionState, CompositionContext } from "./use-composition-state"

export const Composition = observer(() => {
  const state = useCompositionState()
  const { border, motionOffset } = state

  return (
    <CompositionContext.Provider value={state}>
      <CompositionContainer>
        {border && (
          <OffsetControl position="absolute" style={motionOffset!} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Blocks />
            {/* Paths */}
          </OffsetControl>
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

const OffsetControl = MotionBox

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
