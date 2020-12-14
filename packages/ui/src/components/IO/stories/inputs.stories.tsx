import { Meta, Story } from "@storybook/react/types-6-0"
import { useConstant } from "@utils/react/"
import { createTestTypeController } from "@main/test-utils/types/create-test-controller"
import { LogicInterface, ILogicInterfaceSnapshot } from "@main/controllers"
import { Box } from "@ui/common"
import { usePropsUpdateStore } from "@utils/react/use-props-update-store"
import { IO } from "@ui/components/IO"
import { IOState } from "../use-io-state"
import { ComposerState } from "src/components/Composer/use-composer-state"
import { useLocalObservable } from "mobx-react-lite"
import { useMemo } from "react"

const inSnapshot: ILogicInterfaceSnapshot = [
  { _id: "in1", label: "in1", typeKey: "_std_string" },
  { _id: "in2", label: "in2", typeKey: "_std_string" },
  { _id: "in3", label: "in3", typeKey: "_std_string" },
]
const Inputs: Story<{ isEdit: boolean }> = (props) => {
  const io = useConstant(() => LogicInterface.create(inSnapshot, { typeController: createTestTypeController() }))

  const composer = useLocalObservable(() => ({
    dimensions: { height: 600 },
  })) as ComposerState

  const state = useMemo(() => new IOState("in", io, composer), [io, composer])

  usePropsUpdateStore(props, state)

  return <IO ioType="in" io={io} _state={state} />
}

export const Primary = Inputs.bind({})
Primary.args = { isEdit: false }

export const Edit = Inputs.bind({})
Edit.args = { isEdit: true }

export default {
  title: "UI/IO/Inputs",
  decorators: [(Story) => <Box sx={{ w: 400, h: 600, bg: "blueGray.300", position: "relative" }}>{Story()}</Box>],
} as Meta
