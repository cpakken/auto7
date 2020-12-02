import { Meta } from "@storybook/react/types-6-0"
import { useConstant } from "@utils/react/"
import { IO } from "../IO"
import { createTestTypeController } from "@main/test-utils/types/create-test-controller"
import { LogicInterface, ILogicInterfaceSnapshot } from "@main/controllers"

const snapshot: ILogicInterfaceSnapshot = [
  { _id: "in1", label: "in1", typeKey: "_std_string" },
  { _id: "in2", label: "in2", typeKey: "_std_string" },
  { _id: "in3", label: "in3", typeKey: "_std_string" },
]

export const InInterface = () => {
  const io = useConstant(() => LogicInterface.create(snapshot, { typeController: createTestTypeController() }))

  return <IO io={io} />
}

export default {
  title: "UI/IO",
} as Meta
