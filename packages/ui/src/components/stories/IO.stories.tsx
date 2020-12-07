import { Meta, Story } from "@storybook/react/types-6-0"
import { useConstant } from "@utils/react/"
import { IO } from "@ui/components/IO"
import { createTestTypeController } from "@main/test-utils/types/create-test-controller"
import { LogicInterface, ILogicInterfaceSnapshot } from "@main/controllers"
import { useLocalObservable } from "mobx-react-lite"
import { useEffect } from "react"
import { configure } from "mobx"

configure({ enforceActions: "never" })
const snapshot: ILogicInterfaceSnapshot = [
  { _id: "in1", label: "in1", typeKey: "_std_string" },
  { _id: "in2", label: "in2", typeKey: "_std_string" },
  { _id: "in3", label: "in3", typeKey: "_std_string" },
]

function usePropsUpdateStore(props: {}, store: {}) {
  useEffect(() => {
    Object.entries(props).forEach(([k, v]) => {
      if (store[k] !== v) store[k] = v
    })
  })
}

export const InInterface: Story<{ isEdit: boolean }> = (props) => {
  const io = useConstant(() => LogicInterface.create(snapshot, { typeController: createTestTypeController() }))
  const state = useLocalObservable(() => ({ store: { isEdit: false } }))
  usePropsUpdateStore(props, state.store)

  return (
    <div style={{ height: 600, userSelect: "none" }}>
      <IO io={io} _state={state} />
    </div>
  )
}

InInterface.args = {
  isEdit: false,
}

export default {
  title: "UI/IO",
} as Meta
