import { requestUser } from '@/utils/request'
export const ThirdAuth = {
  googleDrive: 'google_drive_1_3491',
  oneDrive: 'one_drive_1_1238',
  googleLogin: 'google_login_2_2694',
  microsoftLogin: 'microsoft_login_2_2861',
  googleCalender: 'google_calendar_3_4956',
  outlookCalender: 'microsoft_calendar_3_6835',
} as const
type ThirdAuthType = typeof ThirdAuth
export type DriveIdentifier = ThirdAuthType['googleDrive'] | ThirdAuthType['oneDrive']
export type CalenderIdentifier = ThirdAuthType['googleCalender'] | ThirdAuthType['outlookCalender']
export type LoginIdentifier = ThirdAuthType['googleLogin'] | ThirdAuthType['microsoftLogin']
export type ThirdLoginInfoRes = {
  identifier: LoginIdentifier
  username: string
  isConnect: boolean
}[]
export async function fetchThirdLoginInfo() {
  return requestUser<ThirdLoginInfoRes>('/api/v1/third/app/getThirdLoginInfo', {
    method: 'get',
  })
}

export type UserCalendarInfoRes = {
  identifier: CalenderIdentifier
  username: string
  accessToken: string
} | null
export async function fetchUserCalendarInfo() {
  return requestUser<UserCalendarInfoRes>('/api/v1/third/app/bind/third/calendar/get', {
    method: 'get',
  })
}

export interface ThirdTokenParams {
  identifier: CalenderIdentifier | DriveIdentifier
}
export type ThirdTokenRes = string
export async function updateThirdToken(params: ThirdTokenParams) {
  return requestUser<ThirdTokenRes>('/api/v1/third/app/refreshAccessToken', {
    method: 'get',
    params,
  })
}
