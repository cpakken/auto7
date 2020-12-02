import { _std_ADDSTRING } from "@main/test-utils/logic/native/std.snapshots"
import { LogicNativeStore } from ".."
import { when } from "mobx"
import { createLogicNativeStoreSnapshot } from "@main/test-utils/logic/snapshot-factories"

describe("NativeLogic", () => {
  test("module loading", async () => {
    const store = LogicNativeStore.create(createLogicNativeStoreSnapshot(_std_ADDSTRING))
    const addstring = store.get("_std_ADDSTRING")
    await when(() => !!addstring.isLoaded)
    const { out } = addstring.module!.outs

    expect(out(["hello", " world"])).toEqual("hello world")
  })
})
