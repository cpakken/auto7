import { $mobx, IReactionDisposer, autorun, runInAction } from "mobx"

export interface IWhenOptions {
  timeout?: number
  onError?: (error: any) => void
}

type Nullable = false | null | undefined
type Truthy<T> = Exclude<T, Nullable>

function isNullable(test): test is Nullable {
  return test === null || test === undefined || test === false
}

export function when<T>(predicate: () => T, opts?: IWhenOptions): Promise<Truthy<T>> & { cancel(): void }
export function when<T>(predicate: () => T, effect: (arg: Truthy<T>) => void, opts?: IWhenOptions): IReactionDisposer
export function when(predicate: any, arg1?: any, arg2?: any): any {
  if (arguments.length === 1 || (arg1 && typeof arg1 === "object")) return whenPromise(predicate, arg1)
  return _when(predicate, arg1, arg2 || {})
}

function _when<T>(predicate: () => T, effect: (arg: Truthy<T>) => void, opts: IWhenOptions): IReactionDisposer {
  let timeoutHandle: any
  if (typeof opts.timeout === "number") {
    timeoutHandle = setTimeout(() => {
      if (!disposer[$mobx].isDisposed_) {
        disposer()
        const error = new Error("WHEN_TIMEOUT")
        if (opts.onError) opts.onError(error)
        else throw error
      }
    }, opts.timeout)
  }

  const disposer = autorun((r) => {
    const cond = predicate()
    if (!isNullable(cond)) {
      r.dispose()
      if (timeoutHandle) clearTimeout(timeoutHandle)
      runInAction(() => effect(cond as Truthy<T>))
    }
  }, opts)
  return disposer
}

function whenPromise<T>(predicate: () => T, opts?: IWhenOptions): Promise<Truthy<T>> & { cancel(): void } {
  let cancel
  const res = new Promise((resolve, reject) => {
    const disposer = _when(predicate, resolve, { ...opts, onError: reject })
    cancel = () => {
      disposer()
      reject("WHEN_CANCELLED")
    }
  })
  ;(res as any).cancel = cancel
  return res as any
}
