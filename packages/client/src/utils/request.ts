import axios, {AxiosRequestConfig} from 'axios'
export const instance = axios.create()
instance.interceptors.request.use((config) => {
  const headers = config.headers
  const _headers = {
    timestamp: Date.now().toString(),
  }
  return {
    headers: {
      ..._headers,
      ...headers,
    },
  }
})
export interface ApiRes<T = null> {
  status: string // 状态码, 0 为无异常, 其他为错误码
  msg?: string // 异常信息, 错误
  data: T
}
export const request = <T>(url: string, params?: AxiosRequestConfig) =>
  instance.request<ApiRes<T>>({
    ...params,
    url
  })
export const requestUser = <T>(path: string, params?: AxiosRequestConfig) =>
  request<T>(`/api/sdk/userServer${path}`, params)
