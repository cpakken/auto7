import { action, IObservableArray, observable, ObservableMap } from "mobx"
import { IBlock, IPath } from "."

export type IConnection = {
  block?: IBlock
  path: IPath
  node: string
  //path: string[]
}

export type IConnections = IObservableArray<IConnection>

export class ConnectionsMap extends ObservableMap<string, IConnections> {
  @action add(node: string, connection: IConnection) {
    if (this.has(node)) this.get(node)!.push(connection)
    else {
      const connections = observable.array([connection], { deep: false })
      this.set(node, connections)
    }
  }
  @action remove(nodeKey: string, _path: IPath) {
    const connections = this.get(nodeKey)
    if (connections) connections.remove(connections.find(({ path }) => path === _path)!)
  }
  @action forAll(fn: (connection: IConnection) => void) {
    this.forEach((connections) => connections.forEach(fn))
    // this.forEach((connections) => connections.slice().forEach(fn))
  }
}
