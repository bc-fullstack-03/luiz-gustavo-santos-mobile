import { TouchableOpacityProps } from 'react-native'

import * as S from './styles'

type ButtonProps = {
  text: string
} & TouchableOpacityProps

export const Button: React.FC<ButtonProps> = ({ text, ...props }) => {
  return (
    <S.Button {...props}>
      <S.Text>{text}</S.Text>
    </S.Button>
  )
}
