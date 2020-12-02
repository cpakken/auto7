import { createTestLogicController } from "@main/test-utils/logic/create-test-controller"
import { when, autorun, _resetGlobalState } from "mobx"
import { ILogicController } from ".."

describe("LogicController", () => {
  let logicController: ILogicController
  beforeEach(() => (logicController = createTestLogicController()))
  afterEach(_resetGlobalState)

  test("load compound example", async () => {
    const compound = logicController.composed.get("ADDSTRING_COMPOUND")
    expect(compound.shallowInfoReady).toBe(true)
  })

  test("logicNative module loading", async () => {
    const addNative = logicController.native.get("_std_ADDSTRING")

    expect(addNative.isLoaded).toBe(false)

    await when(() => !!addNative.module)
    expect(addNative.module).toMatchSnapshot()
    expect(addNative.isLoaded).toBe(true)
  })

  test("isLoaded", async () => {
    const compound = logicController.composed.get("ADDSTRING_COMPOUND")
    const disposer = autorun(() => compound.isLoaded)
    expect(compound.isLoaded).toBe(false)
    await when(() => compound.isLoaded)
    expect(compound.isLoaded).toBe(true)
    disposer()
  })

  test("getUpdatedLogicKeys", async () => {
    const compound = logicController.composed.get("ADDSTRING_COMPOUND")
    const keys = await compound.getKeysWhenReady()
    expect(keys).toMatchSnapshot()
    expect([...keys]).toEqual(compound.info!.keysCache)
  })
})
