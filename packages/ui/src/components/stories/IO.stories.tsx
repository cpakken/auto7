import { Meta } from "@storybook/react/types-6-0"
import { IO } from "../IO"
// import { createTestControllers } from "@main/test-utils"
import { LogicController } from "@main/controllers"

export const InInterface = () => {
  // const c = createTestControllers()
  const l = LogicController.create()

  return <IO />
  // return <div>test</div>
}

export default {
  title: "UI/IO",
} as Meta
