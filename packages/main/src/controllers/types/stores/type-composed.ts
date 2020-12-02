import { isTrueReduce, mapIter } from "@utils/iterable-fns"
import { action, comparer, computed, makeObservable, when } from "mobx"
import { ITypeComposedStore, ITypeNode, isTypeNodeComposed } from ".."

export class TypeComposed {
  readonly typeKey: string
  readonly store: ITypeComposedStore

  constructor(typeKey: string, store: ITypeComposedStore) {
    makeObservable(this)
    this.typeKey = typeKey
    this.store = store
  }

  @computed get info() {
    return this.store.info.get(this.typeKey)
  }

  @computed get composition() {
    return this.store.composition.get(this.typeKey)
  }

  @computed get shallowInfoReady() {
    const { info, composition } = this
    return !!(info && composition && isTrueReduce(composition.store.values(), (node) => node.type.info))
  }

  @computed get isLoaded(): boolean {
    const { composition } = this
    return !!composition && isTrueReduce(composition.store.values(), (node) => node.type.isLoaded)
  }

  /** Combines all typeNodes' typekeys if cached else go one level deeper  */
  @computed({ equals: comparer.shallow })
  private get _shallowKeys(): Set<string> | null {
    if (this.shallowInfoReady) {
      const keys = mapIter(this.composition!.store.values(), (node: ITypeNode) => {
        if (isTypeNodeComposed(node)) {
          const { type } = node
          //Use logicKeysCache when available, if not go deeper with logic.shallowKeys
          return type.info!.keysCache || (type._shallowKeys && [...type._shallowKeys])
        } else return [node.typeKey]
      })

      return isTrueReduce(keys) ? new Set([this.typeKey, ...(<string[]>keys.flat())]) : null
    }
    return null
  }

  /** Returns shallowKeys and updates cache when changed */
  @action.bound updateCacheKeys(): Set<string> | null {
    //check if shallow ready from logicComposed
    const { _shallowKeys } = this
    if (_shallowKeys) {
      this.info!.setKeysCache([..._shallowKeys])
      return _shallowKeys
    } else return null
  }

  /** Returns promise that resolves when logickeys is ready */
  @action.bound getKeysWhenReady(): Promise<Set<string>> {
    return new Promise((res) => {
      let shallowKeys: Set<string> | null
      when(
        () => !!(shallowKeys = this.updateCacheKeys()),
        () => res(shallowKeys!)
      )
    })
  }
}
