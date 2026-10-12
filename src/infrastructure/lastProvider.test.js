import { describe, expect, it } from 'vitest'
import { readLastProvider, saveLastProvider } from './lastProvider'

const memoryStorage = () => {
  const data = new Map()
  return { getItem: (k) => data.get(k) ?? null, setItem: (k, v) => data.set(k, String(v)) }
}
const brokenStorage = { getItem: () => { throw new Error('blocked') }, setItem: () => { throw new Error('blocked') } }

describe('lastProvider', () => {
  it('round-trips the provider id', () => {
    const storage = memoryStorage()
    saveLastProvider('line', storage)
    expect(readLastProvider(storage)).toBe('line')
  })
  it('returns null when nothing is saved', () => {
    expect(readLastProvider(memoryStorage())).toBeNull()
  })
  it('survives blocked storage', () => {
    expect(() => saveLastProvider('line', brokenStorage)).not.toThrow()
    expect(readLastProvider(brokenStorage)).toBeNull()
  })
})
