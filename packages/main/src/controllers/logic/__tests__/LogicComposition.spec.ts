import { mapIter } from "@utils/iterable-fns"
import { toJS } from "mobx"
import { ILogicComposition, LogicComposition } from ".."
import { getSnapshot } from "mobx-state-tree"
import { addIdsToSnapshot } from "@main/test-utils/logic/snapshot-factories"
import { ADDSTRING_COMPOUND } from "@main/test-utils/logic/composed"

// function maptoJS(obj) {
//   return mapValues(obj, (x) => toJS(x))
// }

describe("Logic Composition", () => {
  let composition: ILogicComposition
  beforeEach(() => {
    const snapshot = addIdsToSnapshot(ADDSTRING_COMPOUND)
    composition = LogicComposition.create(snapshot.composition)
  })

  test("create model", () => {
    expect(getSnapshot(composition)).toMatchSnapshot()
  })

  test("verify path initialization in blocks", () => {
    const { inputs: inMap, outputs: outMap } = composition
    const { inputs, outputs } = composition.blocks.get("A")!

    expect(toJS(inMap)).toMatchSnapshot()
    expect(toJS(outMap)).toMatchSnapshot()

    expect(toJS(inputs)).toMatchSnapshot()
    expect(toJS(outputs)).toMatchSnapshot()
  })

  test("verify links when path delete", () => {
    const { inputs, outputs } = composition.blocks.get("A")!
    const { inputs: _inMap, outputs: _outMap } = composition

    mapIter(composition.paths.store.values(), (path) => {
      composition.paths.remove(path)
    })

    expect(getSnapshot(composition)).toMatchSnapshot()

    expect(toJS(_inMap)).toMatchSnapshot()
    expect(toJS(_outMap)).toMatchSnapshot()

    expect(toJS(inputs)).toMatchSnapshot()
    expect(toJS(outputs)).toMatchSnapshot()
  })

  test("verify links when block delete", () => {
    const { inputs, outputs } = composition

    composition.blocks.remove(composition.blocks.get("A")!)

    expect(getSnapshot(composition)).toMatchSnapshot()
    expect(toJS(inputs)).toMatchSnapshot()
    expect(toJS(outputs)).toMatchSnapshot()
  })
})
