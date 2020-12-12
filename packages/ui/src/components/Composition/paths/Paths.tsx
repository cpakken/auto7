import { observer } from "mobx-react-lite"
import { IPath, IPaths } from "@main/controllers"
import { MotionValue } from "framer-motion"
import { CompositionState, useParentCompositionState } from "../use-composition-state"
import { mapIter } from "@utils/iterable-fns"
import { useMemo } from "react"
import { action } from "mobx"

export const Paths = ({ paths }: { paths: IPaths }) => {
  return (
    <div>
      {mapIter(paths.values(), (path) => (
        <Path key={path._id} path={path} />
      ))}
    </div>
  )
}

export const Path = observer(({ path }: { path: IPath }) => {
  const {} = usePathState(path)

  return <div></div>
})

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

    const toNode = to.block ? blocks.get(to.block)!.inNodes.get(to.node)! : null
    const fromNode = from.block ? blocks.get(from.block)!.outNodes.get(from.node)! : null
  }
}

function usePathState(path: IPath) {
  const composition = useParentCompositionState()
  const state = useMemo(() => new PathState(path, composition), [path, composition])
  return state
}
