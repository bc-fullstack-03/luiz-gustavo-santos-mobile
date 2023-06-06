import { TouchableOpacityProps } from 'react-native'

import * as S from './styles'

type ButtonProps = {
  text: string
  small?: boolean
  disabled?: boolean
} & TouchableOpacityProps

export const Button: React.FC<ButtonProps> = ({
  text,
  small,
  disabled,
  ...props
}) => {
  return (
    <S.Button small={small} disabled={disabled} {...props}>
      <S.Text small={small}>{text}</S.Text>
    </S.Button>
  )
}
