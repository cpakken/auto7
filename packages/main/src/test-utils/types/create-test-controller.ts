import { objectToArray } from "@utils/collection-fns"
import { ITypeController, TypeController, TypeNativeSnapshotIn } from "@main/controllers/types"
import { createTypeNativeStoreSnapshot } from "./snapshot-factories"

import * as nativeSnapshots from "./native/std.config"

export function createTestTypeController(env?): ITypeController {
  const nativeLoaders: TypeNativeSnapshotIn[] = objectToArray(nativeSnapshots)
  const native = createTypeNativeStoreSnapshot(nativeLoaders)

  // const composedLoaders: LogicComposedSnapshotIn[] = objectToArray(composedSnapshots)
  // const composed = createLogicComposedStoreSnapshot(composedLoaders)

  const snapshot = {
    native,
    // composed,
  }

  //TODO process cachedKeys
  return TypeController.create(snapshot, env)
}
