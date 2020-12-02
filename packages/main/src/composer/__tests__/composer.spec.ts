import { Composer } from ".."
import { createTestControllers } from "@main/test-utils"

describe("Composer", () => {
  test("init", () => {
    const composer = new Composer("ADDSTRING_COMPOUND", createTestControllers())
    composer.dispose()
  })
})
