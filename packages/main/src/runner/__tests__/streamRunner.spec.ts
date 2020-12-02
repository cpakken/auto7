import { Composer, StreamInput } from "@main/composer"
import { createTestControllers } from "@main/test-utils"
import { autorun, when, _resetGlobalState } from "mobx"
import { ComposedRunner, CompositionRunner, createStreamInputs } from "../streams"
import { Runner } from "../Runner"

describe("Stream Runner", () => {
  afterEach(_resetGlobalState)

  test("calculates", async () => {
    const composer = new Composer("ADDSTRING_COMPOUND", createTestControllers())

    const input = StreamInput.create({ data: { in1: "foo", in2: "bar", in3: "chris" } })
    const stream = createStreamInputs(input, composer.inInterface!)
    const runner = new CompositionRunner(stream, composer.logic.composition!)

    autorun(() => runner.outs.get("out1")!.val)
    await when(() => composer.logic.isLoaded)

    expect(composer.logic.isLoaded).toBe(true)

    const getBlock = (id) => runner.getBlock(runner.logic.getBlock(id)!) as ComposedRunner

    const Arunner = getBlock("A").runner!
    expect(Arunner.ins.get("in2")!.val).toEqual("bar")

    expect(Arunner.outs.get("out1")!.val).toEqual("foobar")
    expect(runner.outs.get("out1")!.val).toEqual("foobarbarchris")

    composer.dispose()
  })

  test("runner", async () => {
    const logicKey = "ADDSTRING_COMPOUND"
    const controllers = createTestControllers()
    const stream = StreamInput.create({ data: { in1: "foo", in2: "bar", in3: "chris" } })
    const inInterface = controllers.logic.composed.get(logicKey).info!.inputs

    const runner = new Runner(logicKey, controllers, { stream, inInterface })
    await when(() => runner.logic.isLoaded)
    expect(runner.runner!.outs.get("out1")!.val).toEqual("foobarbarchris")
    runner.dispose()
  })
})
