import { Modal, ModalProps } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

import * as S from './styles'
import { Text } from '../Text'

type ModalBaseProps = {
  title?: string
  children: React.ReactNode
  onClose?: () => void
} & ModalProps

export const ModalBase: React.FC<ModalBaseProps> = ({
  children,
  title,
  onClose,
  ...props
}) => {
  return (
    <Modal {...props}>
      <S.Wrapper>
        <S.Heading>
          {title && <Text>{title}</Text>}
          <S.ButtonClose onPress={onClose}>
            <Ionicons name="close" color="#FFF" size={24} />
          </S.ButtonClose>
        </S.Heading>
        {children}
      </S.Wrapper>
    </Modal>
  )
}
