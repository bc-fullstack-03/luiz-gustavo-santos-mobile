import { TouchableOpacityProps } from 'react-native'

import * as S from './styles'

type ButtonProps = {
  text: string
  small?: boolean
} & TouchableOpacityProps

export const Button: React.FC<ButtonProps> = ({ text, small, ...props }) => {
  return (
    <S.Button small={small} {...props}>
      <S.Text small={small}>{text}</S.Text>
    </S.Button>
  )
}
