import { deviceEntry as configDeviceEntry } from './config'
import { deviceEntry as servicesDeviceEntry } from './services'
import type { Store } from '@/store'
export function deviceEntry(store: Store) {
  return {
    ...configDeviceEntry(store),
    ...servicesDeviceEntry(),
  }
}
