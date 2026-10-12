// Remembers which provider the user picked last (provider id only, never tokens).
const KEY = 'login:lastProvider'

export function readLastProvider(storage = globalThis.localStorage) {
  try {
    return storage?.getItem(KEY) ?? null
  } catch {
    return null
  }
}

export function saveLastProvider(provider, storage = globalThis.localStorage) {
  try {
    storage?.setItem(KEY, provider)
  } catch {
    // Storage blocked (private mode); the badge is only a convenience.
  }
}
