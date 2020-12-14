import { useEffect } from "react"
import { runInAction } from "mobx"

export function usePropsUpdateStore<P extends {}, S extends {}>(
  props: P,
  store: S,
  customMap: { [K in keyof P]?: (key: K, prop: P[K], store: S) => void } = {}
) {
  useEffect(() => {
    let prevProps = {}

    runInAction(() =>
      Object.entries(props).forEach(([k, v]) => {
        if (prevProps[k] !== v) {
          const custom = customMap[k]
          if (custom) custom(k, v, store)
          else store[k] = v
        }
      })
    )

    prevProps = { ...props }
  })
}
