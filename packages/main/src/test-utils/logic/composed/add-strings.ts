import { LogicComposedSnapshotIn } from "@main/controllers/logic"

export const ADDSTRING: LogicComposedSnapshotIn = {
  _id: "ADDSTRING",
  composition: {
    blocks: [{ _id: "A", logicKey: "_std_ADDSTRING" }],
    paths: [
      { _id: "pA", from: { node: "in1" }, to: { block: "A", node: "in1" } },
      { _id: "pB", from: { node: "in2" }, to: { block: "A", node: "in2" } },
      { _id: "pC", from: { block: "A", node: "out" }, to: { node: "out1" } },
    ],
  },
  info: {
    label: "ADDSTRING COMPOSED",
    inputs: [
      { _id: "in1", label: "in1", typeKey: "_std_string" },
      { _id: "in2", label: "in2", typeKey: "_std_number" },
    ],
    outputs: [{ _id: "out1", label: "out1", typeKey: "_std_string" }],
  },
}

export const ADDSTRING_NESTED: LogicComposedSnapshotIn = {
  _id: "ADDSTRING_NESTED",
  composition: {
    blocks: [{ _id: "A", logicKey: "ADDSTRING" }],
    paths: [
      { _id: "pA", from: { node: "in1" }, to: { block: "A", node: "in1" } },
      { _id: "pB", from: { node: "in2" }, to: { block: "A", node: "in2" } },
      { _id: "pC", from: { block: "A", node: "out1" }, to: { node: "out1" } },
    ],
  },
  info: {
    label: "ADDSTRING NESTED",
    inputs: [
      { _id: "in1", label: "in1", typeKey: "_std_string" },
      { _id: "in2", label: "in2", typeKey: "_std_number" },
    ],
    outputs: [{ _id: "out1", label: "out1", typeKey: "_std_string" }],
  },
}

export const ADDSTRING_COMPOUND: LogicComposedSnapshotIn = {
  _id: "ADDSTRING_COMPOUND",
  composition: {
    blocks: [
      { _id: "A", logicKey: "ADDSTRING", xy: [0, 0] },
      { _id: "B", logicKey: "ADDSTRING_NESTED", xy: [0, 0] },
      { _id: "C", logicKey: "_std_ADDSTRING", xy: [0, 0] },
    ],
    paths: [
      { _id: "p0", from: { node: "in1" }, to: { block: "A", node: "in1" } },
      { _id: "p1", from: { node: "in2" }, to: { block: "A", node: "in2" } },
      { _id: "p2", from: { node: "in2" }, to: { block: "B", node: "in1" } },
      { _id: "p3", from: { node: "in3" }, to: { block: "B", node: "in2" } },
      { _id: "p4", from: { block: "A", node: "out1" }, to: { block: "C", node: "in1" } },
      { _id: "p5", from: { block: "B", node: "out1" }, to: { block: "C", node: "in2" } },
      { _id: "p6", from: { block: "C", node: "out" }, to: { node: "out1" } },
    ],
  },
  info: {
    label: "ADDSTRING COMPOUND",
    inputs: [
      { _id: "in1", label: "in1", typeKey: "_std_string" },
      { _id: "in2", label: "in2", typeKey: "_std_string" },
      { _id: "in3", label: "in3", typeKey: "_std_string" },
    ],
    outputs: [{ _id: "out1", label: "out1", typeKey: "_std_string" }],
  },
}
