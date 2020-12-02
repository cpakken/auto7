import { getSnapshot } from "mobx-state-tree"
import { createTestTypeController } from "../create-test-controller"

describe("loadedTypeController", () => {
  test("inits", () => {
    const controller = createTestTypeController()
    // const native = controller.native.get("_std_string")
    expect(getSnapshot(controller)).toMatchSnapshot()
  })
})
