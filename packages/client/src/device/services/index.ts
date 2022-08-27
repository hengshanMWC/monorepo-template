import * as loginServices from './login'
import * as thirdAuthServices from './thirdAuth'
export function deviceEntry() {
  return {
    ...loginServices,
    ...thirdAuthServices,
  }
}
