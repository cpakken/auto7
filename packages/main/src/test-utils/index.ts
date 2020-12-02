import { TypeController, IControllers } from "@main/controllers"
import { createTestLogicController } from "./logic/create-test-controller"

export function createTestControllers(): IControllers {
  const type = TypeController.create()
  const logic = createTestLogicController({ typeController: type })
  return { logic, type }
}
