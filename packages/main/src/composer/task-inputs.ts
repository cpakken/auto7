import { types, SnapshotOrInstance, destroy } from "mobx-state-tree"
import { moveItem } from "mobx-utils"

export type ITaskData = { [key: string]: any }
export const TaskData = types.frozen<ITaskData>()
export const TaskInputsModel = types
  .model({
    store: types.map(TaskData),
    list: types.array(types.safeReference(TaskData)),
    //TODO add logic to keep track of how many tasks are being processed and remove them from list when done
    //TODO only send over tasks to runner which are being processed
    //TODO get variable from Composer that controls how many tasks can be processed at the same time
  })
  .views((self) => ({
    get(key: string) {
      return self.store.get(key)
    },
    atIndex(i: number) {
      return self.list[i]
    },
  }))
// .volatile((self) => ({
//   inputs: getComposer(self).logic.info!.inputs.store,
// }))
// .actions((self) => ({
//   addTask(task: ITaskData) {
//     self.add(task)
//   },
//  completeTask(){}
// }))

export const TaskInputs = TaskInputsModel.actions((self) => ({
  add(value: SnapshotOrInstance<ITaskData>) {
    const instance = self.store.put(value)
    self.list.push(instance)
    return instance
  },
  move(from: number, to: number) {
    moveItem(self.list, from, to)
  },
  remove(item: ITaskData) {
    destroy(item)
  },
  delete(_id: string) {
    return self.store.delete(_id)
  },
}))
