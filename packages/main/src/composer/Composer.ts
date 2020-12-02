import { autorun, computed, reaction } from "mobx"
import { getEnv, IAnyStateTreeNode } from "mobx-state-tree"
import { IControllers, ILogicInterface, LogicComposed } from "@main/controllers"
import { IStreamInput, StreamInput } from "."

export class Composer {
  stream: IStreamInput
  logicKey: string

  dispose: () => void
  controllers: IControllers

  @computed get logic(): LogicComposed {
    return this.controllers.logic.composed.get(this.logicKey)
  }

  @computed get inInterface(): ILogicInterface | undefined {
    return this.logic.info?.inputs
  }

  constructor(logicKey: string, controllers: IControllers) {
    const stream = StreamInput.create()

    this.logicKey = logicKey
    this.controllers = controllers
    this.stream = stream

    const disposers: (() => void)[] = []
    this.dispose = () => {
      disposers.forEach((disposer) => disposer())
      // disposers. TODO clear this
    }

    disposers.push(autorun(() => this.logic.updateCacheKeys()))
    disposers.push(
      reaction(
        () => this.inInterface && new Set([...this.inInterface.store.keys()]),
        (keys) => keys && this.stream.purge(keys)
      )
    )
  }
}

export function getComposer(inst: IAnyStateTreeNode): Composer {
  return getEnv(inst).composer
}

//TODO create in mainApp
// function generateComposerSnapshot(logicKey){} -> shallowInfoLogic snapshot
// function generateRunnerSnapshot(logicKey){} -> deeply loaded logic snapshot
