import _ConfirmModal from './ConfirmModal'

import type { ConfirmModalHooks, ModalRenderConfig } from './ConfirmModalHook'
import { renderModal } from './ConfirmModalHook'

type ConfirmModalValue = typeof _ConfirmModal & ConfirmModalHooks

const ConfirmModal: ConfirmModalValue = _ConfirmModal as any

ConfirmModal.confirm = (config: ModalRenderConfig) => renderModal(config)

export default ConfirmModal
