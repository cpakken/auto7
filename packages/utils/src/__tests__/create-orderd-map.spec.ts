import { types, getSnapshot } from "mobx-state-tree"
import { HasID, createOrderedMap } from "../mst"

describe("createOrderedMap", () => {
  test("initialize", () => {
    const Foo = createOrderedMap(HasID.props({ a: types.number }))

    const init = [
      { _id: "a", a: 4 },
      { _id: "b", a: 5 },
      { _id: "c", a: 6 },
    ]

    const foo = Foo.create(init)

    expect(getSnapshot(foo)).toEqual(init)
  })

  test("push/delete/move", () => {
    const Foo = createOrderedMap(HasID.props({ a: types.number }))

    const init = [
      { _id: "a", a: 4 },
      { _id: "b", a: 5 },
      { _id: "c", a: 6 },
    ]

    const foo = Foo.create(init)
    expect(getSnapshot(foo.add({ a: 7 }))).toMatchSnapshot()

    expect(getSnapshot(foo)).toMatchSnapshot()

    foo.remove(foo.get("a")!)
    expect(getSnapshot(foo)).toMatchSnapshot()

    foo.move(0, 1)
    expect(getSnapshot(foo)).toMatchSnapshot()

    // expect(getSnapshot(foo)).toEqual(init)
  })
})
