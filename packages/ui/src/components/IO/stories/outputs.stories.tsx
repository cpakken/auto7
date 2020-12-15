import { Meta, Story } from "@storybook/react/types-6-0"
import { useConstant } from "@utils/react/"
import { createTestTypeController } from "@main/test-utils/types/create-test-controller"
import { LogicInterface, ILogicInterfaceSnapshot } from "@main/controllers"
import { usePropsUpdateStore } from "@utils/react/use-props-update-store"
import { Box } from "@ui/common"
import { IO } from "@ui/components/IO"
import { IOState } from "../use-io-state"
import { useLocalObservable } from "mobx-react-lite"
import { ComposerState } from "src/components/Composer/use-composer-state"

const outSnapshot: ILogicInterfaceSnapshot = [
  { _id: "out1", label: "out1", typeKey: "_std_string" },
  { _id: "out2", label: "out2", typeKey: "_std_string" },
  { _id: "out3", label: "out3", typeKey: "_std_string" },
]

const Outputs: Story<{ isEdit: boolean }> = (props) => {
  const io = useConstant(() => LogicInterface.create(outSnapshot, { typeController: createTestTypeController() }))

  const composer = useLocalObservable(() => ({
    dimensions: { height: 600 },
  })) as ComposerState

  const state = useConstant(() => new IOState("out", io, composer))

  usePropsUpdateStore(props, state)

  return <IO ioType="out" _state={state} />
}

export const Primary = Outputs.bind({})
Primary.args = { isEdit: false }

export const Edit = Outputs.bind({})
Edit.args = { isEdit: true }

export default {
  title: "UI/IO/Outputs",
  decorators: [(Story) => <Box sx={{ w: 400, h: 600, bg: "blueGray.300", position: "relative" }}>{Story()}</Box>],
} as Meta
