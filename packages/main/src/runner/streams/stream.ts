import { IMSTMap } from "mobx-state-tree"
import { SmartMap, MapProps } from "smartmap"
import { MapFromObject } from "@utils/MapFromObject"
import { IStreamInputModel } from "@main/composer"
import { ConnectionsMap, IConnections, LogicModule, LogicFn } from "@main/controllers"
import { StreamValue, StreamValueProducer, StreamValueNull, StreamSyncValue, IStreamValueNull, CompositionRunner } from "."
import { StreamPreValue } from "./values"
import { IRunnerInInterface, IRunnerNodeModel } from "../in-interface"

export interface Stream<T extends StreamValue = StreamValue> extends MapProps<string, T> {
  get(nodeKey: string): T | undefined
}

class StreamNullClass extends MapProps<string, IStreamValueNull> implements Stream {
  readonly size = 0
  has(_key: string) {
    return false
  }
  get(_nodeKey: string) {
    return StreamValueNull
  }
  *keys() {}
}

export const StreamNull = new StreamNullClass()

export class StreamBase<N = any, V extends StreamValue = StreamValue> extends SmartMap<string, N, V> implements Stream {}

// export class StreamProducer extends StreamBase<ILogicNodeModel, StreamValueProducer | IStreamValueNull> {
export class StreamProducer extends StreamBase<IRunnerNodeModel, StreamValueProducer | IStreamValueNull> {
  // constructor(inInterface: ILogicInterfaceModel["store"], dataStream: IMSTMap<any>) {
  constructor(inInterface: IRunnerInInterface["store"], dataStream: IMSTMap<any>) {
    super(inInterface, (node) => {
      return node.type ? new StreamValueProducer(node, dataStream) : StreamValueNull
    })
  }
}

export class StreamRemap extends StreamBase<IConnections, StreamValue> {
  constructor(connectionsMap: ConnectionsMap, composition: CompositionRunner) {
    const { getBlock, ins } = composition
    super(connectionsMap, ([connection]) => {
      if (connection) {
        const { node, block } = connection
        return (block ? getBlock(block).outs.get(node) : ins.get(node)) || StreamValueNull
      }
      return StreamValueNull
    })
  }
}

// export class StreamNative extends StreamBase<LogicOutNode, StreamValue> {
export class StreamNative extends StreamBase<LogicFn, StreamValue> {
  constructor(stream: StreamRemap, { ins, outs }: LogicModule) {
    const pre = new StreamPreValue(ins, stream)

    super(new MapFromObject(outs), (fn) => {
      //TODO if out.afn -> async , if out.fn -> sync
      return pre.val ? new StreamSyncValue({ fn, pre }) : pre
    })
  }
}

// export function createStreamInputs(stream: IStreamInputModel, inInterface: ILogicInterfaceModel) {
export function createStreamInputs(stream: IStreamInputModel, inInterface: IRunnerInInterface) {
  const { data } = stream
  return new StreamProducer(inInterface.store, data)
}
