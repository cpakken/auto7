import { IPath } from "@main/controllers"
import { MotionValue } from "framer-motion"
import { CompositionState, useParentCompositionState } from "../use-composition-state"
import { useEffect, useMemo } from "react"
import { action } from "mobx"

export class PathState {
  path: IPath
  composition: CompositionState

  // to: MotionValue<number>
  // from: MotionValue<number>
  to = new MotionValue(0)
  from = new MotionValue(0)

  constructor(path: IPath, composition: CompositionState) {
    this.path = path
    this.composition = composition
  }

  @action.bound initialize() {
    const { to, from } = this.path
    const { blocks } = this.composition

    const toNode = to.block ? blocks.get(to.block)!.inputs.get(to.node)! : null
    const fromNode = from.block ? blocks.get(from.block)!.outputs.get(from.node)! : null
  }

  private getToValue() {
    const { block, node } = this.path.to

    if (block) {
      const blockState = this.composition.blocks.get(block)!
      const { motionXY } = blockState
      const { height } = blockState.inputs.get(node)!
    } else {
      const nodeState = this.composition.composer.inputs.nodes.get(node)!
    }
  }
}

export function usePathState(path: IPath) {
  const composition = useParentCompositionState()
  const state = useMemo(() => new PathState(path, composition), [path, composition])

  useEffect(state.initialize, [])

  return state
}
