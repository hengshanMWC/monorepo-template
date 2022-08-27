import type { ReactNode } from 'react'
import type { ModalProps } from 'antd/lib/modal/Modal'
import React from 'react'
import { Modal } from 'antd'
import type { IconType } from './Title'
import ModalTitle from './Title'
import ModalFooter from './Footer'
import { ReactComponent as CloseSvg } from '@/assets/imgs/ic_close.svg'
import './ConfirmModal.less'

export interface ConfirmModalProps extends ModalProps {
  hideCancel?: boolean
  hideOk?: boolean
  icon?: ReactNode
  closeIcon?: ReactNode
  iconType?: IconType
  showTitle?: boolean
  showFooter?: boolean
  titleStyle?: React.CSSProperties
  title?: string
  expandFooter?: ReactNode
}

const ConfirmModalComponent: React.FC<ConfirmModalProps> = props => {
  const {
    width = 457,
    children,
    showTitle = true,
    showFooter = true,
    title,
    visible,
    footer,
    okText,
    cancelText,
    hideCancel,
    hideOk,
    icon,
    iconType,
    wrapClassName,
    okButtonProps,
    onOk,
    onCancel,
    closeIcon,
    titleStyle,
    expandFooter,
    ...otherProps
  } = props

  return (
    <Modal
      className="modalWrap"
      maskClosable={false}
      centered
      width={width}
      visible={visible}
      onCancel={onCancel}
      closable={false}
      wrapClassName={`${wrapClassName || ''}`}
      maskStyle={{
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      }}
      title={
        <ModalTitle
          show={showTitle}
          icon={icon}
          iconType={iconType}
          title={title}
          closeIcon={closeIcon || <CloseSvg />}
          style={titleStyle}
          onClose={onCancel}
        />
      }
      footer={
        <ModalFooter
          show={showFooter}
          footer={footer}
          okButtonProps={okButtonProps}
          onCancel={onCancel}
          onOk={onOk}
          okText={okText}
          cancelText={cancelText}
          hideCancel={hideCancel}
          hideOk={hideOk}
          expandContent={expandFooter}
        />
      }
      {...otherProps}
    >
      <div className="modal-content">{children}</div>
    </Modal>
  )
}

export default ConfirmModalComponent
