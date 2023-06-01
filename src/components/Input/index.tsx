import { TextInputProps } from 'react-native'

import { useTheme } from 'styled-components/native'

import * as S from './styles'

type InputProps = {
  label?: string
  error?: string
} & TextInputProps

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  const { colors } = useTheme()

  return (
    <S.Wrapper>
      {!!label && <S.Label>{label}</S.Label>}
      <S.TextInput placeholderTextColor={colors.gray100} {...props} />
      {error && <S.Error>{error}</S.Error>}
    </S.Wrapper>
  )
}
