import { blendConfig, getConfig, Config } from './config'
class Store {
  private config!: Config
  setConfig (config: Config) {
    this.config = config
    return this
  }
  getConfig () {
    return this.config
  }
}
export function createAuth(options: Partial<Config>) {
  const _store = new Store()
  function defineConfig(options) {
    _store.setConfig(blendConfig(options))
  }
  defineConfig(options)
  return {
    defineConfig,
  }
}
