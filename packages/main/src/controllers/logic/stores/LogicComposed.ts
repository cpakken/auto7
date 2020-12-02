import { isTrueReduce, mapIter } from "@utils/iterable-fns"
import { action, computed, makeObservable, when, comparer } from "mobx"
import {
  IBlock,
  isBlockComposed,
  ILogicComposition,
  ILogicComposedInfo,
  ILogicComposedStore,
  ILogicComposedInfoSnapshotIn,
  ILogicCompositionSnapshotIn,
  ILogicComposedInfoSnapshot,
  ILogicCompositionSnapshot,
} from ".."

export class LogicComposed {
  readonly logicKey: string
  readonly store: ILogicComposedStore

  constructor(logicKey: string, store: ILogicComposedStore) {
    makeObservable(this)
    this.logicKey = logicKey
    this.store = store
  }

  @computed get info(): ILogicComposedInfo | undefined {
    return this.store.info.get(this.logicKey)
  }

  @computed get composition(): ILogicComposition | undefined {
    return this.store.composition.get(this.logicKey)
  }

  @computed get shallowInfoReady() {
    const { info, composition } = this
    return !!(info && composition && isTrueReduce(composition.blocks.store.values(), (block) => block.logic.info))
  }

  @computed get isLoaded(): boolean {
    const { composition } = this
    return !!composition && isTrueReduce(composition.blocks.store.values(), (block) => block.logic.isLoaded)
  }

  /** Combines all blocks' logickeys if cached else go one level deeper  */
  @computed({ equals: comparer.shallow })
  private get _shallowKeys(): Set<string> | null {
    if (this.shallowInfoReady) {
      const keys = mapIter(this.composition!.blocks.store.values(), (block: IBlock) => {
        if (isBlockComposed(block)) {
          const { logic } = block
          //Use logicKeysCache when available, if not go deeper with logic.shallowKeys
          return logic.info!.keysCache || (logic._shallowKeys && [...logic._shallowKeys])
        } else return [block.logicKey]
      })

      return isTrueReduce(keys) ? new Set([this.logicKey, ...(<string[]>keys.flat())]) : null
    }
    return null
  }

  /** Returns shallowKeys and updates cache when changed */
  @action updateCacheKeys(): Set<string> | null {
    //check if shallow ready from logicComposed
    const { _shallowKeys } = this
    if (_shallowKeys) {
      this.info!.setKeysCache([..._shallowKeys])
      return _shallowKeys
    } else return null
  }

  /** Returns promise that resolves when logickeys is ready */
  @action getKeysWhenReady(): Promise<Set<string>> {
    return new Promise((res) => {
      let shallowKeys: Set<string> | null
      when(
        () => !!(shallowKeys = this.updateCacheKeys()),
        () => res(shallowKeys!)
      )
    })
  }
}

export interface LogicComposedSnapshotIn {
  _id: string
  info: Omit<ILogicComposedInfoSnapshotIn, "_id">
  composition: Omit<ILogicCompositionSnapshotIn, "_id">
}

export interface LogicComposedSnapshot {
  _id: string
  info: Omit<ILogicComposedInfoSnapshot, "_id">
  composition: Omit<ILogicCompositionSnapshot, "_id">
}
