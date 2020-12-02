import { getSnapshot } from "mobx-state-tree"
import { toJS } from "mobx"
import { ADDSTRING_COMPOUND } from "@main/test-utils/logic/composed"
import { createLogicComposedStoreSnapshot } from "@main/test-utils/logic/snapshot-factories"
import { ILogicComposedStore, LogicComposedStore } from "@main/controllers/logic"

describe("LogicComposed", () => {
  let store: ILogicComposedStore

  beforeEach(() => {
    const snapshot = createLogicComposedStoreSnapshot(ADDSTRING_COMPOUND)
    store = LogicComposedStore.create(snapshot)
  })

  test("store snapshot", () => {
    expect(getSnapshot(store)).toMatchSnapshot()
  })

  test("deleting io node will automatically delete connecting paths", () => {
    const { info, composition } = store.get("ADDSTRING_COMPOUND")

    info!.inputs.delete("in2")

    expect(toJS(composition!.blocks.get("A")!.inputs)).toMatchSnapshot()
    expect(toJS(composition!.inputs)).toMatchSnapshot()
    expect(getSnapshot(composition!).paths).toMatchSnapshot()
  })
})
