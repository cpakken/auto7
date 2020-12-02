import { getSnapshot } from "mobx-state-tree"
import { ADDSTRING_COMPOUND } from "../composed"
import { createLogicComposedStoreSnapshot } from "../snapshot-factories"
import { createTestLogicController } from "../create-test-controller"

describe("loadedControllers", () => {
  test("convertLogicSnapshot", () => {
    const snapshot = createLogicComposedStoreSnapshot(ADDSTRING_COMPOUND)
    expect(snapshot).toMatchSnapshot()
  })
  test("createLoadedController", () => {
    const logicController = createTestLogicController()
    expect(getSnapshot(logicController)).toMatchSnapshot()
  })
})
