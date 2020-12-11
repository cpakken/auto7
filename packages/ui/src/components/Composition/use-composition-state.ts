import { ILogicComposition } from "@main/controllers"
import { createContext, createRef, RefObject, useContext, useLayoutEffect } from "react"
import { action, makeObservable, observable } from "mobx"
import { useConstant } from "@utils/react"
import { BlocksState, InitialPoint } from "./blocks/use-blocks-state"
import { useUnmountEffect } from "@chakra-ui/react"
import { BlockState } from "./blocks/use-block-state"

export type Dimensions = { width: number; height: number }

export class CompositionState {
  ref: RefObject<HTMLDivElement>
  composition: ILogicComposition
  blocks: BlocksState

  @observable blockHover: BlockState | null = null
  @observable blockDrag: BlockState | null = null

  @observable.ref dimensions: null | Dimensions = null

  constructor(composition: ILogicComposition) {
    makeObservable(this)
    this.ref = createRef()
    this.composition = composition
    this.blocks = new BlocksState(composition.blocks, this)
  }

  @action.bound dispose() {}

  @action setDimensions(dimensions: Dimensions) {
    this.dimensions = dimensions
  }
}

export function useCompositionState(composition: ILogicComposition) {
  const state = useConstant(() => new CompositionState(composition))

  useLayoutEffect(() => {
    const { offsetHeight, offsetWidth } = state.ref.current!
    state.setDimensions({ width: offsetWidth, height: offsetHeight })
  }, [])

  useUnmountEffect(state.dispose)

  return state
}

export const CompositionContext = createContext<CompositionState>({ min: InitialPoint, max: InitialPoint } as any)

export function useParentCompositionState() {
  return useContext(CompositionContext)
}

//TODO use createRef instead of useRef
// use MotionValue instea dof useMotionValue
