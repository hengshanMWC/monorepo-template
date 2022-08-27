import { Env } from '../device/config'
export function getURLSearchParams(query: string) {
  return new URLSearchParams(window.location.search).get(query)
}

export function getEnv(href = window.location.href) {
  if (href.includes('-dev.test.')) {
    return Env.DEV
  }
  else if (href.includes('.test.')) {
    return Env.TEST
  }
  else {
    return Env.PROD
  }
}
