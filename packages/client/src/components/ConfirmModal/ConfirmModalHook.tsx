import type { ConfirmModalProps } from './ConfirmModal'
import ConfirmModal from './ConfirmModal'
import type { Merge } from '@/constants/common'
import { reactRender, removeComponent } from '@/utils/window'
import MountIntl from '@/wrappers/mountIntl'

type ConfigUpdate =
  | ModalRenderConfig
  | ((prevConfig: ModalRenderConfig) => ModalRenderConfig)

type ConfirmModalWithContent = ConfirmModalProps & {
  content?: React.ReactNode
}

interface ConfirmModalFuncsReturn {
  update: (config: ConfigUpdate) => void
  destroy: () => void
}

// 注入formatMessage
const NewConfirmModal = MountIntl((config: ConfirmModalWithContent) => (
  <ConfirmModal {...config}>{config?.content}</ConfirmModal>
))

export type ModalRenderConfig = Merge<
Omit<ConfirmModalProps, 'visible'>,
{
  content?: React.ReactNode
  onCancel?: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    close: () => void,
  ) => any
  onOk?: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    close: () => void,
  ) => any
}
>

export function renderModal (
  config: ModalRenderConfig,
): ConfirmModalFuncsReturn {
  const container = document.createDocumentFragment()
  let curConfig = {
    ...config,
    visible: true,
    onCancel: _onCancel,
    onOk: _onOk,
  } as any

  const render = (config: ConfirmModalWithContent) => {
    setTimeout(() => {
      reactRender(<NewConfirmModal {...config} />, container)
    }, 0)
  }

  const update = (config: ConfigUpdate) => {
    if (typeof config === 'function') {
      curConfig = config(curConfig)
    }
    else {
      curConfig = {
        ...curConfig,
        ...config,
      }
    }

    render(curConfig)
  }

  const destroy = () => {
    removeComponent(container)
  }

  const close = () => {
    curConfig = {
      ...curConfig,
      visible: false,
      afterClose: () => {
        config.afterClose && config.afterClose()

        setTimeout(destroy, 100)
      },
    }

    render(curConfig)
  }

  function _onCancel (e: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (config.onCancel) {
      config.onCancel(e, close)
    }
  }

  function _onOk (e: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (config.onOk) {
      config.onOk(e, close)
    }
  }

  render(curConfig)

  return {
    destroy: close,
    update,
  }
}

export type ConfirmModalHooks = Record<
'confirm',
(config: ModalRenderConfig) => ConfirmModalFuncsReturn
>
