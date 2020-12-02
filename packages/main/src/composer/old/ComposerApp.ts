import { getSnapshot, onPatch, IDisposer, clone } from "mobx-state-tree"
import { IPCChannel } from "@auto/ipc/types"
import { Host, Proxy } from "@auto/ipc"
import { Controllers } from "../Controllers"
import { MainHostDefinition } from "../Apps/Main"
import { IComposerLogic, ComposerLogic, IComposerLogicSnapshot } from "./ComposerLogic"
import { IStreamInputs, IStreamInputsSnapshot, StreamInputs } from "./StreamInputs"
import { createDebounceFunction } from "@utils/createDebounceFunction"
import { generatePatches } from "@utils/mst/generatePatches"
import { RunnerHost } from "../../Runner"

export interface ComposerHost {
  modules: {
    model: {
      getComposerSnapshot: () => ComposerSnapshot
    }
  }
  subscriptions: {
    getLogicPatches: {
      subscriber: (sink) => IDisposer
      unsubscribe: (disposer: IDisposer) => void
    }
    getStreamInputPatches: {
      subscriber: (sink) => IDisposer
      unsubscribe: (disposer: IDisposer) => void
    }
  }
}

export interface ComposerSnapshot {
  logic?: IComposerLogicSnapshot
  stream?: IStreamInputsSnapshot
}

export interface ComposerClone {
  logic: IComposerLogic | null
  stream: IStreamInputs | null
}

export interface IRunnerProxy extends Proxy<RunnerHost> {}
export interface IMainProxy extends Proxy<MainHostDefinition> {}

export class ComposerApp {
  readonly _id: string
  readonly logic: IComposerLogic
  readonly stream: IStreamInputs

  readonly runnerProxy: IRunnerProxy
  private mainProxy: IMainProxy
  private ipcHost: Host

  // constructor(id: string, composerSnapshot: ComposerSnapshot, mainChannel: IPCChannel, runnerChannel: IPCChannel) {
  constructor(id: string, mainChannel: IPCChannel, runnerChannel: IPCChannel) {
    this._id = id

    const mainProxy = new Proxy<MainHostDefinition>("dataStore", mainChannel)
    this.mainProxy = mainProxy
    const logicDBs = {
      native: mainProxy.getModule("logicNativeDB"),
      composed: mainProxy.getModule("logicComposedDB"),
    }
    const typeDBs = {
      native: mainProxy.getModule("typeNativeDB"),
      composed: mainProxy.getModule("typeComposedDB"),
    }

    //get Root Logic Snapshot from Main
    const { logic, stream } = composerSnapshot
    const controllers = Controllers.create({}, { logicDBs, typeDBs })
    this.logic = ComposerLogic.create(logic, { controllers })
    this.stream = StreamInputs.create(stream, { logic: this.logic })

    this.runnerProxy = new Proxy<RunnerHost>(id + "_RUNNER", runnerChannel)

    let composerClone: ComposerClone = { logic: null, stream: null }

    const ipcHost = new Host<ComposerHost>(this._id, {
      modules: {
        model: {
          getComposerSnapshot: () => {
            composerClone = {
              logic: clone(this.logic),
              stream: clone(this.stream),
            }
            return {
              logic: getSnapshot(composerClone.logic || {}),
              stream: getSnapshot(composerClone.stream || {}),
            }
          },
        },
      },
      subscriptions: {
        //combine to just getComposerPatches {type: logic | options | stream, patch: IPatch}
        getLogicPatches: {
          subscriber: (sink) => {
            const debouncedSink = createDebounceFunction(sink)
            if (composerClone.logic) {
              generatePatches(composerClone.logic, this.logic).forEach(debouncedSink)
              composerClone.logic = null
            }
            return onPatch(this.logic, debouncedSink)
          },
          unsubscribe: (disposer) => disposer(),
        },
        getStreamInputPatches: {
          subscriber: (sink) => {
            const debouncedSink = createDebounceFunction(sink)
            if (composerClone.stream) {
              generatePatches(composerClone.stream, this.stream).forEach(debouncedSink)
              composerClone.stream = null
            }
            return onPatch(this.stream, debouncedSink)
          },
          unsubscribe: (disposer) => disposer(),
        },
      },
    })

    ipcHost.addChannel(runnerChannel)
    this.ipcHost = ipcHost
  }

  dispose() {
    this.mainProxy.close()
    this.runnerProxy.close()
    this.ipcHost.closeAllChannels()
  }
}
