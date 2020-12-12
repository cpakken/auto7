import { observer } from "mobx-react-lite"
import { IPath, IPaths } from "@main/controllers"
import { mapIter } from "@utils/iterable-fns"
import { usePathState } from "./use-path-state"

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
