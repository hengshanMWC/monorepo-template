import type { Config } from './config'
import { blendConfig } from './config'
import { Store } from './store'

export function createAuth(options: Partial<Config>) {
  const _store = new Store()
  function defineConfig(options: Partial<Config>) {
    _store.setConfig(blendConfig(options))
  }
  defineConfig(options)
  return {
    defineConfig,
  }
}
