import { computed, makeObservable } from "mobx"
import { ITypeNativeInfo, ITypeNativeInfoSnapshot, ITypeNativeInfoSnapshotIn, ITypeNativeStore } from ".."

//TODO have two kinds of TypeNative -> ones included by default do not need to have module loaded aync
export class TypeNative {
  readonly typeKey: string
  readonly store: ITypeNativeStore

  constructor(logicKey: string, store: ITypeNativeStore) {
    makeObservable(this)
    this.typeKey = logicKey
    this.store = store
  }

  @computed get info(): ITypeNativeInfo | undefined {
    return this.store.info.get(this.typeKey)
  }

  // @computed get module() {
  //   return this.lazyModule.current()
  // }

  @computed get isLoaded(): boolean {
    return !!this.module
  }

  //toSnpashot (serialize)
  //fromSnapshot (deserialize)
}

export interface TypeNativeSnapshotIn {
  _id: string
  info: Omit<ITypeNativeInfoSnapshotIn, "_id">
}

export interface TypeNativeSnapshot {
  _id: string
  info: Omit<ITypeNativeInfoSnapshot, "_id">
}
