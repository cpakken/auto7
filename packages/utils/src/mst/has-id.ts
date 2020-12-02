import { types } from "mobx-state-tree"
import { createId } from "../create-id"

export const HasID = types.model({
  _id: types.optional(types.identifier, createId),
})
