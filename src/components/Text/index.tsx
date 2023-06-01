import { TextProps } from 'react-native'

import * as S from './styles'

export type Props = {
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'
  color?: string
  bold?: boolean
  children: React.ReactNode
} & TextProps

export const Text: React.FC<Props> = ({
  size = 'medium',
  color,
  children,
  bold,
  ...props
}) => {
  return (
    <S.TextStyled size={size} bold={bold} color={color} {...props}>
      {children}
    </S.TextStyled>
  )
}
