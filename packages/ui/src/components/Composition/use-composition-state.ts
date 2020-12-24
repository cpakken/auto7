import { useEffect } from "react"
import { animate, MotionValue } from "framer-motion"
import { action, computed, makeObservable, observable, reaction } from "mobx"
import { SmartMap, ReadOnlyMap } from "smartmap"
import { reduceIter } from "@utils/iterable-fns"
import { ILogicComposition } from "@main/controllers"
import { BlockState } from "./blocks/use-block-state"
import { ComposerState, Dimensions } from "../Composer/use-composer-state"

type Point = { x: number; y: number }
type MotionPoint = { x: MotionValue<number>; y: MotionValue<number> }

export type Blocks = ReadOnlyMap<string, BlockState>

export const InitialPoint = { x: 0, y: 0 }

// @refresh reset
export class CompositionState {
  composition: ILogicComposition

  composer: ComposerState
  blocks: Blocks
  //paths

  motionOffset: MotionPoint

  @observable blockHover: BlockState | null = null
  @observable blockDrag: BlockState | null = null

  constructor(composer: ComposerState) {
    makeObservable(this)
    this.composer = composer
    this.composition = composer.composed.composition
    this.blocks = new SmartMap(this.composition.blocks.store, (block) => new BlockState(block, this), { eager: true })
    //paths

    this.motionOffset = { x: new MotionValue(this.offset.x), y: new MotionValue(this.offset.y) }
  }

  //Run in ComposerState
  @action dispose() {
    console.log("composition disposed")
    // this.blocks.dispose()
    // this.paths.dispose()
  }

  @action.bound private intialize() {
    //Sync motionOffset with observable offset
    const { motionOffset } = this
    const config = { type: "spring", bounce: 0.1 } as const
    return reaction(
      () => this.offset!,
      ({ x, y }) => {
        animate(motionOffset.x, x, config)
        animate(motionOffset.y, y, config)
      }
    )
  }

  useInit = () => {
    useEffect(this.intialize, [])
  }

  @computed get min(): Point {
    return (
      reduceIter(this.blocks.values(), (a, { x, y }) => {
        return a ? { x: Math.min(x, a.x), y: Math.min(y, a.y) } : { x, y }
      }) || InitialPoint
    )
  }
  @computed get max(): Point {
    return (
      reduceIter(this.blocks.values(), (a, { width, height, x, y }) => {
        const next = { x: x + width, y: y + height }
        return a ? { x: Math.max(a.x, next.x), y: Math.max(a.y, next.y) } : next
      }) || InitialPoint
    )
  }

  @computed get dimensions(): Dimensions {
    return { width: this.max.x - this.min.x, height: this.max.y - this.min.y }
  }

  @computed get border(): Dimensions {
    //Can change based on composition focus
    return this.composer.dimensions
  }

  @computed get offset(): Point {
    const { dimensions, border, min } = this
    return {
      x: -min.x + (border.width - dimensions.width) / 2,
      y: -min.y + (border.height - dimensions.height) / 2,
    }
  }
}

// export function useCompositionState() {
//   const composer = useParentComposerState()
//   const state = useConstant(() => composer.composition)
//   useEffect(state.intialize, [])

//   return state
// }

// export const CompositionContext = createContext({} as CompositionState)

// export function useParentCompositionState() {
//   return useContext(CompositionContext)
// }

//TODO use createRef instead of useRef
// use MotionValue instea dof useMotionValue
