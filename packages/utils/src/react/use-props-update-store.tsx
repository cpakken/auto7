import { useEffect } from "react"
import { runInAction } from "mobx"

export function usePropsUpdateStore(props: {}, store: {}) {
  useEffect(() => {
    runInAction(() =>
      Object.entries(props).forEach(([k, v]) => {
        if (store[k] !== v) store[k] = v
      })
    )
  })
}
