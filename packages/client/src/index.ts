import { deviceEntry } from '@/device'
import type { Config } from '@/device/config'
import { Store } from '@/store'

export function createAuth(options: Partial<Config> = {}) {
  const _store = new Store()
  const result = deviceEntry(_store)
  result.defineConfig(options)
  return result
}

export const {
  defineConfig,
  fetchUserInfo,
  checkToken,
  signout,
  fetchThirdLoginInfo,
  fetchUserCalendarInfo,
  updateThirdToken,
} = createAuth()
