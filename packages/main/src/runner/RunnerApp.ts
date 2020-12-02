import { Proxy } from "@auto/ipc/IPCProxy"
import { IPCChannel } from "@auto/ipc/types"
import { Host } from "@auto/ipc"
import { createTriggerPromise } from "@auto/enhancepromise"
import { applyPatch } from "mobx-state-tree"
import { observable, runInAction, autorun } from "mobx"
import { ComposerHost } from "../Composer"
// import { MainHostDefinition } from "../Main"
import { Controllers } from "../Controllers"
import { LogicTaskRunner } from "./LogicTaskRunner"
// import { ITopLogicComposed, ITopOptions, TopLogicComposed, TopOptions } from "../../Models/ComposerModel/TopLogicModel"
import { IComposerLogic, ComposerLogic } from "../Composer/ComposerLogic"
import { IRunnerStreamInputs, RunnerStreamInputs } from "./tasks/inputs"

abstract class Runner {
  protected mainProxy: Proxy<MainHostDefinition>
  protected composerProxy: Proxy<ComposerHost>
  abstract ipcHost: Host

  constructor(composerID: string, composerChannel: IPCChannel, mainChannel: IPCChannel) {
    this.composerProxy = new Proxy(composerID, composerChannel)
    this.mainProxy = new Proxy("dataStore", mainChannel)
  }

  dispose() {
    this.mainProxy.close()
    this.composerProxy.close()
  }
}

interface IRunnerModel {
  logic: IComposerLogic
  // options: ITopOptions
  stream: IRunnerStreamInputs
}

export interface RunnerQuery {
  path: string
  node: string
  queue: string
}

//Batch this
function createRunnerQuerySubscriber(taskRunner: TaskRunnerApp) {
  return {
    subscriber: (sink, query: RunnerQuery) => {
      const { runner } = taskRunner
      const { path, node, queue } = query
      const subscribe = () => sink(runner!.query(path, node, queue))
      return autorun(runner ? subscribe : () => taskRunner.runner && subscribe())
    },
    unsubscribe: (disposer) => disposer(),
  }
}

export interface RunnerHost {
  subscriptions: { query: ReturnType<typeof createRunnerQuerySubscriber> }
}

export class TaskRunnerApp extends Runner {
  ipcHost: Host
  @observable.ref model: IRunnerModel | undefined
  @observable.ref runner: LogicTaskRunner | undefined
  readonly runnerPromise = createTriggerPromise<LogicTaskRunner>()

  constructor(composerID: string, composerChannel: IPCChannel, mainChannel: IPCChannel) {
    super(composerID, composerChannel, mainChannel)
    this.ipcHost = new Host<RunnerHost>(composerID + "_RUNNER", {
      subscriptions: { query: createRunnerQuerySubscriber(this) },
    })
    this.ipcHost.addChannel(composerChannel)
    this.ipcHost.addChannel(mainChannel)

    this.init()
  }

  private async init() {
    //TODO can make these getter functions in constructor
    const { getComposerSnapshot } = this.composerProxy.getModule("model")
    const { getLogicControllerSnapshot } = this.mainProxy.getModule("snapshot")

    const composerSnapshot = await getComposerSnapshot()
    const logicControllerSnapshot = await getLogicControllerSnapshot(composerSnapshot.logic!._info!.cachedLogicKeys!, {
      _composed: 1,
      _native: 1,
    })

    const controllers = Controllers.create(
      { logic: logicControllerSnapshot },
      {
        logicDBs: {
          native: this.mainProxy.getModule("logicNativeDB"),
          composed: this.mainProxy.getModule("logicComposedDB"),
        },
        typeDBs: {
          native: this.mainProxy.getModule("typeNativeDB"),
          composed: this.mainProxy.getModule("typeComposedDB"),
        },
      }
    )

    const logic = ComposerLogic.create(composerSnapshot.logic, { controllers })
    // const options = TopOptions.create(composerSnapshot.options, { logic })
    const stream = RunnerStreamInputs.create(composerSnapshot.stream, { logic })

    runInAction(() => {
      // this.model = { logic, options, stream }
      this.model = { logic, stream }
      this.runner = new LogicTaskRunner(logic.composition, stream.outs, () => options.valueMap)
      this.runnerPromise.resolve(this.runner)
    })

    this.composerProxy.getSubscription("getLogicPatches", (patches) => applyPatch(logic, patches))
    this.composerProxy.getSubscription("getOptionsPatches", (patches) => applyPatch(options, patches))
    this.composerProxy.getSubscription("getStreamInputPatches", (patches) => applyPatch(stream, patches))
  }

  dispose() {
    super.dispose()
    this.ipcHost.closeAllChannels()
  }
}

// export class StreamRunner extends Runner {
//    constructor() {
//       super()
//    }
// }
