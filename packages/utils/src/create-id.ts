import { customAlphabet, nanoid } from "nanoid"

export function createTestIdFactory() {
  let id = 0
  const gen = () => (id++).toString()
  gen.reset = () => (id = 0)
  return gen
}

export function createIdFactory() {
  const first = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 1)
  return () => first() + nanoid(9)
}

type CreateId = { (): string; reset?: () => void }
export const createId: CreateId = process.env.NODE_ENV === "test" ? createTestIdFactory() : createIdFactory()
