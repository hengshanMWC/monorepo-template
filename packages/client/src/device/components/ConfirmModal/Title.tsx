import type { ReactNode } from 'react'
import React from 'react'
import { isBoolean } from 'lodash'
import IconFont from '@/components/IconFont'
import './Title.less'

export type IconType = 'warning'

const Icons = {
  warning: (
    <IconFont className="warning-icon icon" type="icon-a-ic_toast_warning2x" />
  ),
}

interface ModalTitleProps extends React.HTMLAttributes<HTMLElement> {
  icon?: ReactNode
  iconType?: IconType
  title?: string
  show?: boolean
  closeIcon?: ReactNode
  onClose?: (e: React.MouseEvent<HTMLElement>) => void
}

const ModalTitle: React.FC<ModalTitleProps> = props => {
  const {
    icon,
    iconType = 'warning',
    title,
    show,
    closeIcon,
    onClose,
    ...opts
  } = props
  return (
    <>
      {show
        ? (
          <div className="title-content" {...opts}>
            {icon && (isBoolean(icon) ? Icons[iconType] : icon)}
            <span className="title">{title}</span>
            <div className="close-icon" onClick={onClose}>
              {closeIcon}
            </div>
          </div>
        )
        : (
          <></>
        )}
    </>
  )
}

export default ModalTitle
