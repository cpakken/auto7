import { DeepMergeMap } from "../DeepMergeMap"

export type Entry = { path: string[]; val: string }

describe.only("deepMapMerge", () => {
  test("deepMerge get/set", () => {
    const deepMap = new DeepMergeMap()

    const path1 = "a.b.c".split(".")
    const path2 = "a.e.f".split(".")

    const entries: Entry[] = [
      {
        path: path1,
        val: "foo",
      },
      {
        path: path1,
        val: "bar",
      },
      {
        path: path2,
        val: "test",
      },
    ]

    entries.forEach(({ path, val }) => deepMap.set(path, val))
    expect(deepMap.getValues(path1)).toEqual(["foo", "bar"])
    expect(deepMap.getValues(path2)).toEqual(["test"])
    expect(deepMap.getOne(path2)).toEqual("test")

    console.log(deepMap.getValues("a.b".split(".")))

    deepMap.delete(path1, "foo")
    console.log(deepMap.getValues(path1))
  })
})
