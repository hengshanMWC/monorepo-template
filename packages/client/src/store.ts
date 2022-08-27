import type { Config } from './config'
export class Store {
  private config!: Config
  setConfig(config: Config) {
    this.config = config
    return this
  }

  getConfig() {
    return this.config
  }
}
