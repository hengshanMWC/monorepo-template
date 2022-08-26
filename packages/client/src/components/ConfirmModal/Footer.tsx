import React from 'react'
import type { ReactNode } from 'react'
import type { ModalProps } from 'antd/lib/modal/Modal'
import { Button } from 'antd'
import { isFunction } from 'lodash'
import { useIntl } from 'umi'
import styles from './Footer.less'

interface DefaultFooterProps {
  okText?: ReactNode
  cancelText?: ReactNode
  expandContent: ReactNode
  okButtonProps: ModalProps['okButtonProps']
  onCancel: ModalProps['onCancel']
  onOk: ModalProps['onOk']
  hideOk?: boolean
  hideCancel?: boolean
}
// 默认的Footer，在show=true且未传入footer时使用
const DefaultFooter = (props: DefaultFooterProps) => {
  const { formatMessage } = useIntl()
  const {
    okText = formatMessage({ id: 'global.confirmModal.confirm' }),
    cancelText = formatMessage({ id: 'global.confirmModal.cancel' }),
    expandContent,
    okButtonProps,
    onCancel,
    onOk,
    hideOk = false,
    hideCancel = false,
  } = props
  return (
    <div
      className={`${styles['default-footer']} ${
        hideOk || hideCancel ? styles['single-btn-footer'] : ''
      }`}
    >
      <div>{expandContent}</div>
      <div>
        {!hideCancel && (
          <Button className={`${styles['default-footer-btn']} ${styles.cancel}`} onClick={onCancel}>
            {cancelText}
          </Button>
        )}
        {!hideOk && (
          <Button
            {...okButtonProps}
            type="primary"
            className={`${styles['default-footer-btn']} ${styles.ok}`}
            onClick={onOk}
          >
            {okText}
          </Button>
        )}
      </div>
    </div>
  )
}

interface FooterProps extends DefaultFooterProps {
  show: boolean
  footer?: ReactNode
}
const Footer = (props: FooterProps) => {
  const { show, footer: CFooter, ...defaultFooterProps } = props
  return (
    <>
      {show
        ? (
          <div>
            {CFooter
              ? (
                isFunction(CFooter)
                  ? (
                    <CFooter {...props} />
                  )
                  : (
                    CFooter
                  )
              )
              : (
                <DefaultFooter {...defaultFooterProps} />
              )}
          </div>
        )
        : (
          <></>
        )}
    </>
  )
}

export default Footer
