import {getLocale} from '../utils/locale'

export interface Config {
  locale: string,
  env: string,
  appCode?: string
}
export function blendConfig(template: Config, options: Config) {

}

export function getConfig() {
  return {
    locale: getLocale(),
    env: '',
  }
}
