import { blendConfig, getConfig } from './config'
export function createAuth(options) {
  const config = getTemplateConfig()
  function defineConfig(options) {
    blendConfig(config, options)
  }
  defineConfig(options)
  return {
    defineConfig,
  }
}
