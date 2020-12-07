import { createContext, useContext } from "react"
import { observable } from "mobx"
import { useLocalObservable } from "mobx-react-lite"

export const IOContext = createContext<IOState>(observable({ store: { isEdit: false } }))

export function useParentIOState() {
  return useContext(IOContext)
}

export type IOState = ReturnType<typeof useIOState>
export function useIOState() {
  const store = useLocalObservable(() => ({ isEdit: false }))

  return { store }
}
