import { TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import * as S from './styles'

type InputProps = {
  label?: string
  errorMessage?: string
  icon?: React.ReactNode
} & TextInputProps

export const Input: React.FC<InputProps> = ({
  label,
  errorMessage,
  icon,
  ...props
}) => {
  const { colors } = useTheme()

  return (
    <S.Wrapper>
      {!!label && <S.Label>{label}</S.Label>}
      <S.ContainerInput hasIcon={!!icon}>
        {!!icon && icon}
        <S.TextInput placeholderTextColor={colors.gray500} {...props} />
      </S.ContainerInput>
      {errorMessage && <S.Error>{errorMessage}</S.Error>}
    </S.Wrapper>
  )
}
