import { useMemo, useRef } from "react"
// import { useUnmountEffect } from "./use-unmount-effects"

//TODO use this to initaialize

export function useMemoCleanUp<T>(fn: () => T, onChange: (prev: T, current: T) => void, deps: any[] = []) {
  const prev = useRef<T>()

  return useMemo(() => {
    const next = fn()
    if (prev.current) onChange(prev.current, next)
    prev.current = next
    return next
  }, deps)
}
