import { objectToArray } from "@utils/collection-fns"
import { LogicController, ILogicController, LogicNativeSnapshotIn, LogicComposedSnapshotIn } from "@main/controllers/logic"
import { createLogicNativeStoreSnapshot, createLogicComposedStoreSnapshot } from "./snapshot-factories"

import * as nativeSnapshots from "./native/snapshots"
import * as composedSnapshots from "./composed"

export function createTestLogicController(env?): ILogicController {
  const nativeLoaders: LogicNativeSnapshotIn[] = objectToArray(nativeSnapshots)
  const native = createLogicNativeStoreSnapshot(nativeLoaders)

  const composedLoaders: LogicComposedSnapshotIn[] = objectToArray(composedSnapshots)
  const composed = createLogicComposedStoreSnapshot(composedLoaders)

  const snapshot = { composed, native }

  //TODO process cachedKeys
  return LogicController.create(snapshot, env)
}
