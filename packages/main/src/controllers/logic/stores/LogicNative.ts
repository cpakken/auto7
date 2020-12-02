import { computed, makeObservable } from "mobx"
import { ILazyObservable, lazyObservable } from "mobx-utils"
import { ILogicNativeInfoSnapshot, ILogicNativeInfoSnapshotIn, ILogicNativeStore } from ".."

export type LogicFn = (ins: any[]) => any
export type LogicModule = { ins: string[]; outs: { [key: string]: LogicFn } }

export const idSplitterRegex = /^_(?<path>[^_]+)(_(?<modKey>[^_]+))?$/

export class LogicNative {
  readonly logicKey: string
  readonly store: ILogicNativeStore
  private lazyModule: ILazyObservable<LogicModule | undefined>

  constructor(logicKey: string, store: ILogicNativeStore) {
    makeObservable(this)
    this.logicKey = logicKey
    this.store = store

    const { path, modKey } = logicKey.match(idSplitterRegex)!.groups!

    this.lazyModule = lazyObservable<LogicModule>((sink) => {
      const p =
        process.env.NODE_ENV === "test"
          ? import(`@main/test-utils/logic/native/${path}.logic.ts`)
          : import(
              /* webpackInclude: /\.logic.ts$/ */
              /* webpackMode: "lazy" */
              `../../../test-utils/logic/native/${path}.logic.ts`
              // `@/testUtils/logic/native/${path}.logic.ts`
            )

      p.then((dep) => {
        const logicModule: LogicModule = modKey ? dep[modKey] : dep
        if (logicModule) sink(logicModule)
        // else setError(new Error(`Invalid native logic link: ${path}`))
        else throw new Error(`Invalid native logic link: ${path}`)
      }).catch((e) => {
        throw e
      })
    })
  }

  @computed get info() {
    return this.store.info.get(this.logicKey)
  }

  @computed get module() {
    return this.lazyModule.current()
  }

  @computed get isLoaded(): boolean {
    return !!this.module
  }
}

export interface LogicNativeSnapshotIn {
  _id: string
  info: Omit<ILogicNativeInfoSnapshotIn, "_id">
}

export interface LogicNativeSnapshot {
  _id: string
  info: Omit<ILogicNativeInfoSnapshot, "_id">
}
