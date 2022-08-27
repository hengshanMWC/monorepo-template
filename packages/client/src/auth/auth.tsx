import { IntlProvider } from 'react-intl'
import React from 'react'
import { message } from 'antd'
import type { CalenderIdentifier, UserCalendarInfoRes } from '../services/thirdAuth'
import { getUserCalendarInfo, ThirdAuth } from '../services/thirdAuth'
import ConfirmModal from '../components/ConfirmModal'
import connect_fail_en_US from '../assets/imgs/calendar/connect_fail_en_US.png'
import connect_fail_ja_JP from '../assets/imgs/calendar/connect_fail_ja_JP.png'
import connect_fail_zh_TW from '../assets/imgs/calendar/connect_fail_zh_TW.png'
import styles from './auth.less'
const localeImageMap = {
  'en-US': connect_fail_en_US,
  'ja-JP': connect_fail_ja_JP,
  'zh-TW': connect_fail_zh_TW,
}

const IDENTIFIER_MAP = {
  [ThirdAuth.googleCalender]: {
    name: 'googleCalender',
    fridaySource: 'Google Calender',
  },
  [ThirdAuth.outlookCalender]: {
    name: 'outlookCalender',
    fridaySource: 'Outlook Calender',
  },
}
export class CalendarAuth {
  private identifier: CalenderIdentifier
  postMessageTimers: {
    timer: NodeJS.Timer
    callback: (event: any) => void
  } | null = null

  currentResolve!: (data: any) => void
  // currentReject!: (err: Error) => void

  constructor(identifier: CalenderIdentifier) {
    this.identifier = identifier
  }

  authStart() {
    return new Promise((resolve, reject) => {
      this.currentResolve = resolve
      // this.currentReject = reject
      this.updateInfo()
    })
  }

  forceAuth() {
    return new Promise((resolve, reject) => {
      this.currentResolve = resolve
      // this.currentReject = reject
      this.dispatchConnectAction()
    })
  }

  updateInfo() {
    updateInfo()
      .then(data => {
        if (isConnect(data, this.identifier)) {
          message.error(formatMessage({ id: 'couldDrive.content.hasConnected' }))
        }
        else {
          this.dispatchConnectAction()
        }
      })
  }

  dispatchConnectAction() {
    this.removeListeners()
    // 跳转至日历授权
    const authUrl = `${process.env.SSO_URL}/thirdDriveAuth?driveType=${IDENTIFIER_MAP[this.identifier].name}&appCode=${process.env.appCode}`
    const targeFrame = window.open(authUrl)
    const messageListerCallback = (event: MessageEvent) => this.handleGetMessage(event)
    window.addEventListener<'message'>('message', messageListerCallback, false)
    const timer = setInterval(function () {
      targeFrame?.postMessage('', '*')
    }, 500)
    this.postMessageTimers = {
      timer,
      callback: messageListerCallback,
    }
  }

  removeListeners() {
    if (!this.postMessageTimers) return
    const { timer, callback } = this.postMessageTimers
    timer && clearInterval(timer)
    callback && window.removeEventListener('message', callback, false)
    this.postMessageTimers = null
  }

  // 处理授权回调页面的postMessage消息
  handleGetMessage(event: MessageEvent) {
    try {
      const { data, source } = event
      let dataStr = data
      if (dataStr) {
        dataStr = '{}'
      }
      const dataObj = JSON.parse(data)
      const { action = '', content } = dataObj
      const appCode = process.env.appCode
      switch (action) {
        case 'GET_APP_CODE':
          source && source.postMessage(
            JSON.stringify({
              action: 'GET_APP_CODE',
              content: appCode,
            }),
            {
              targetOrigin: '*',
            },
          )
          break
        case 'GET_TOKEN':
          this.removeListeners()

          if (content?.hasAllAuthority) {
            setTimeout(() => {
              this.currentResolve(dataObj)
            }, 500)
          }
          else {
            const { destroy } = ConfirmModal.confirm({
              title: formatMessage({ id: 'integrations.title.dirveConnectFail' }),
              content: (
                <IntlProvider>
                  <div className={styles['modal-children-wrapper']}>
                    {formatMessage({ id: 'integrations.content.dirveConnectFail' })}
                    <img
                      className={styles.drive_fail_img}
                      alt=""
                      src={localeImageMap[getLocale() as keyof typeof localeImageMap]}
                    />
                  </div>
                </IntlProvider>
              ),
              okText: formatMessage({ id: 'global.btn.retry' }),
              cancelText: formatMessage({ id: 'global.btn.cancel' }),
              onOk: () => {
                this.dispatchConnectAction()
                destroy()
              },
              onCancel: () => {
                destroy()
                // this.currentReject(new Error('onCancel'))
              },
              width: 420,
            })
          }
      }
    }
    catch (e) {
      console.error('handleGetMessgae error:', e)
    }
  }
}
// 更新用户日历绑定信息
function updateInfo() {
  return getUserCalendarInfo()
    .then(({ data }) => data.data)
}

// 通过应用标识符获取用户对应的绑定信息
function getInfoByIdentifier(info: UserCalendarInfoRes, identifier: CalenderIdentifier) {
  if (info && info.identifier === identifier) {
    return info
  }
  else {
    return null
  }
}

// 是否已绑定
function isConnect(info: UserCalendarInfoRes, identifier: CalenderIdentifier) {
  const curInfo = getInfoByIdentifier(info, identifier)
  return !!curInfo
}
