import { observer } from "mobx-react-lite"
import { ILogicComposition } from "@main/controllers"
import { useCompositionState, CompositionContext } from "./use-composition-state"
import { createBox } from "@ui/utils/hoc"
import { Blocks } from "./blocks"

const CompositionWrapper = createBox({
  baseStyle: { w: "full", h: "full", bg: "blueGray.300", position: "relative", userSelect: "none" },
})

export const Composition = observer(({ composition }: { composition: ILogicComposition }) => {
  const state = useCompositionState(composition)
  const { ref } = state
  const { blocks } = composition
  // const { dimensions } = state

  return (
    <CompositionContext.Provider value={state}>
      <CompositionWrapper ref={ref}>
        {/* {dimensions && <Blocks blocks={blocks} />} */}
        <Blocks blocks={blocks} />
      </CompositionWrapper>
    </CompositionContext.Provider>
  )
})
