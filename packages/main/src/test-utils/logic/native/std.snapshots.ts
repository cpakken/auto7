import { LogicNativeSnapshotIn } from "@main/controllers/logic"

export const _std_ADDSTRING: LogicNativeSnapshotIn = {
  _id: "_std_ADDSTRING",
  info: {
    label: "ADDSTRING NATIVE",
    // description: 'concatentate strings from input',
    inputs: [
      { _id: "in1", label: "in1", typeKey: "_string" },
      { _id: "in2", label: "in2", typeKey: "_string" },
    ],
    outputs: [{ _id: "out", label: "out", typeKey: "_string" }],
  },
}
