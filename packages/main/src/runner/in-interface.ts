import { getEnv, Instance, types } from "mobx-state-tree"
import { HasID, createOrderedMap } from "@utils/mst"
import { IType } from "@main/controllers/types"

export interface IRunnerNodeModel extends Instance<typeof RunnerNodeModel> {}
export const RunnerNodeModel = HasID.props({
  typeKey: types.optional(types.string, ""),
}).views((self) => ({
  get type(): IType | null {
    const { typeKey } = self
    return typeKey ? getEnv(self).typeController.get(typeKey) : null
  },
}))

export interface IRunnerInInterface extends Instance<typeof RunnerInInterface> {}
export const RunnerInInterface = createOrderedMap(RunnerNodeModel)
