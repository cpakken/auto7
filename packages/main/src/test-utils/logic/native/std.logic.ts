import { LogicModule } from "@main/controllers/logic"

export const ADDSTRING: LogicModule = {
  ins: ["in1", "in2"],
  outs: { out: ([in1, in2]) => in1 + in2 },
}
