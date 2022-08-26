import { request } from '../utils/request'
export interface UserInfo {
  email: string
  nickName: string
  uid: string
  username: string
  areaId?: string
  avatarUrl?: string
  isInTrail?: boolean
}
export type UserInfoValue = Partial<UserInfo>

export async function getUserInfo () {
  return request<UserInfo>('/api/sdk/user/userInfo')
}

export async function signout () {
  return request('/api/sdk/user/logout', {
    method: 'get',
  })
}

export type CheckTokenRes = Record<string, any>
export async function checkToken () {
  return request<CheckTokenRes>('/api/sdk/user/checkToken')
}
