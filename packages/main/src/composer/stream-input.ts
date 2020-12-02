import { types, SnapshotIn, Instance } from "mobx-state-tree"

export interface IStreamInputModelSnapshotIn extends SnapshotIn<typeof StreamInputModel> {}
export interface IStreamInputModel extends Instance<typeof StreamInputModel> {}
export const StreamInputModel = types.model({
  data: types.map(types.frozen()),
})

export interface IStreamInputSnapshotIn extends SnapshotIn<typeof StreamInput> {}
export interface IStreamInput extends Instance<typeof StreamInput> {}
export const StreamInput = StreamInputModel.actions((self) => ({
  update(nodeKey: string, value) {
    self.data.set(nodeKey, value)
  },
  purge(validKeys: Set<string>) {
    const { data } = self
    for (let key of data.keys()) {
      if (!validKeys.has(key)) data.delete(key)
    }
  },
}))
