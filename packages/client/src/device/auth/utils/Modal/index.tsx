import { IntlProvider, FormattedMessage } from 'react-intl'
import React from 'react'
import ConfirmModal from '@/device/components/ConfirmModal'
import connect_fail_en_US from '@/assets/imgs/calendar/connect_fail_en_US.png'
import connect_fail_ja_JP from '@/assets/imgs/calendar/connect_fail_ja_JP.png'
import connect_fail_zh_TW from '@/assets/imgs/calendar/connect_fail_zh_TW.png'
import { Locale } from '@/constants'
const localeImageMap = {
  [Locale.enUS]: connect_fail_en_US,
  [Locale.jaJP]: connect_fail_ja_JP,
  [Locale.zhTW]: connect_fail_zh_TW,
}
export function openModal() {
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
