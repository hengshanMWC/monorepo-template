import { getLocale } from '@/utils/locale'
import { getEnv } from '@/utils'
import type { Store } from '@/store'
export enum Env {
  DEV = 'dev',
  TEST = 'test',
  PROD = 'prod',
}

export interface Config {
  locale: string
  env: Env
  appCode?: string | undefined
}
export function blendConfig(options: Partial<Config>, template: Config = getConfig()) {
  return {
    ...template,
    ...options,
  }
}

export function getConfig(): Config {
  return {
    locale: getLocale(),
    env: getEnv(),
  }
}
export function deviceEntry(store: Store) {
  function defineConfig(options: Partial<Config>) {
    store.setConfig(blendConfig(options))
  }
  return {
    defineConfig,
  }
}
