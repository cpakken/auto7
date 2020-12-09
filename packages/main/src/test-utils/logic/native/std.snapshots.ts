import { LogicNativeSnapshotIn } from "@main/controllers/logic"

export const _std_ADDSTRING: LogicNativeSnapshotIn = {
  _id: "_std_ADDSTRING",
  info: {
    label: "ADDSTRING NATIVE",
    // description: 'concatentate strings from input',
    inputs: [
      { _id: "in1", label: "in1", typeKey: "_std_string" },
      { _id: "in2", label: "in2", typeKey: "_std_string" },
    ],
    outputs: [{ _id: "out", label: "out", typeKey: "_std_string" }],
  },
}
