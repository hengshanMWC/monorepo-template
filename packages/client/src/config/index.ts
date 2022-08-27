import { getLocale } from '../utils/locale'
import { getEnv } from '../utils'
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
