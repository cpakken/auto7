import { IControllers } from "@main/controllers"
import { createTestLogicController } from "./logic/create-test-controller"
import { createTestTypeController } from "./types/create-test-controller"

export function createTestControllers(): IControllers {
  const type = createTestTypeController()
  const logic = createTestLogicController({ typeController: type })
  return { logic, type }
}
