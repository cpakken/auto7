import { IStreamInputModel, StreamInputModel } from "@main/composer"
import { IControllers, LogicComposed } from "@main/controllers"
import { autorun, computed } from "mobx"
import { IRunnerInInterface, RunnerInInterface } from "./in-interface"
import { CompositionRunner, createStreamInputs, StreamProducer } from "./streams"

export class Runner {
  logicKey: string
  controllers: IControllers
  logic: LogicComposed
  ins: StreamProducer
  dispose: () => void

  @computed get runner() {
    const { composition } = this.logic
    return composition && new CompositionRunner(this.ins, composition)
  }

  constructor(
    logicKey: string,
    controllers: IControllers,
    deps: { stream?: IStreamInputModel; inInterface?: IRunnerInInterface } = {}
  ) {
    const stream = deps.stream || StreamInputModel.create()
    const inInterface = deps.inInterface || RunnerInInterface.create([], { typeController: controllers.type })

    this.logicKey = logicKey
    this.controllers = controllers
    this.logic = controllers.logic.composed.get(this.logicKey)

    this.ins = createStreamInputs(stream, inInterface)

    const disposers: (() => void)[] = []
    this.dispose = () => {
      disposers.forEach((disposer) => disposer())
      // disposers. TODO clear this
    }

    // disposers.push(autorun(() => this.runner?.outs.get("out1")!.val))

    disposers.push(
      autorun(() => {
        if (this.runner) {
          for (const streamValue of this.runner.outs.values()) streamValue.val
        }
      })
    )
  }
}
