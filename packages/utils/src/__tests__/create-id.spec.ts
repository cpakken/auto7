import { createTestIdFactory, createIdFactory } from "../create-id"

describe("createId", () => {
  test("creates id", () => {
    const createId = createTestIdFactory()

    console.log(createId())
    console.log(createId())
    console.log(createId())
  })

  test("creates id dev", () => {
    const createId = createIdFactory()

    console.log(createId())
    console.log(createId())
    console.log(createId())
  })
})
