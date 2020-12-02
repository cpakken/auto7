import { useRef } from "react"

export function useConstant<T>(fn: () => T): T {
  const ref = useRef<T | undefined>()

  if (ref.current === undefined) {
    ref.current = fn()
  }

  return ref.current
}
