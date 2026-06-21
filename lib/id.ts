import { nanoid } from 'nanoid'

export function generateId(): string {
  return nanoid(8) // e.g. "x7k2p9qz"
}