import { LogicFn } from "@main/controllers"
import { computed, makeObservable } from "mobx"
import { IMSTMap } from "mobx-state-tree"
import { IRunnerNodeModel } from "../in-interface"
import { StreamRemap } from "./stream"

export enum Status {
  SUCCESS,
  ERROR,
  NULL,
  LOADING,
}
//TODO for Tasks -> no longer need to be computed since doesn't need to observe changes just set value statically

export type IStreamValueNull = typeof StreamValueNull
export const StreamValueNull = { val: null, status: Status.NULL as const }

export interface StreamValue {
  val: any
  status: Status
}

export class StreamValueProducer implements StreamValue {
  node: IRunnerNodeModel
  data: IMSTMap<any>

  constructor(node: IRunnerNodeModel, data: IMSTMap<any>) {
    this.node = node
    this.data = data
  }

  get status() {
    return Status.SUCCESS
  }

  @computed get val() {
    //TODO hydrate with node.type!
    return this.data.get(this.node._id)
  }
}

export type StreamSyncConfig = { pre: StreamPreValue; fn: LogicFn }
export class StreamSyncValue implements StreamValue {
  config: StreamSyncConfig

  constructor(config: StreamSyncConfig) {
    makeObservable(this)
    this.config = config
  }

  @computed get status() {
    return Status.SUCCESS
  }

  //TODO if fn() is promise then do some async processing
  @computed get val() {
    const { pre, fn } = this.config
    return fn(pre.args!)
  }
}

export class StreamPreValue implements StreamValue {
  inKeys: string[]
  stream: StreamRemap

  constructor(inKeys: string[], stream: StreamRemap) {
    makeObservable(this)
    this.inKeys = inKeys
    this.stream = stream
  }

  @computed get mapped() {
    return this.inKeys.map((key) => this.stream.get(key) || StreamValueNull)
  }

  @computed get status() {
    let result = Status.SUCCESS
    for (let { status } of this.mapped) {
      if (status === Status.ERROR) return Status.ERROR
      if (status === Status.NULL) result = Status.NULL
      if (status === Status.LOADING && result !== Status.NULL) result = Status.LOADING
    }
    return result
  }

  @computed get val() {
    return this.status === Status.SUCCESS ? true : null
  }

  @computed get args() {
    return this.val && this.mapped.map(({ val }) => val)
  }
}
