import {getLocale} from '../utils/locale'
import { getEnv} from '../utils'
export enum Env {
  DEV = 'dev',
  TEST = 'test',
  PROD = 'prod'
}

export interface Config {
  locale: string,
  env: Env,
  appCode?: string
}
export function blendConfig(options: Config, template: Config = getConfig()) {
  return {
    ...template,
    ...options
  }
}

export function getConfig() {
  return {
    locale: getLocale(),
    env: getEnv(),
  }
}
