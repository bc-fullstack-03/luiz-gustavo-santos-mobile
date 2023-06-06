import { TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import * as S from './styles'

type InputProps = {
  label?: string
  errorMessage?: string
  icon?: React.ReactNode
  backgroundColor?: string
  withBorder?: boolean
} & TextInputProps

export const Input: React.FC<InputProps> = ({
  label,
  errorMessage,
  icon,
  backgroundColor,
  withBorder,
  ...props
}) => {
  const { colors } = useTheme()

  return (
    <S.Wrapper>
      {!!label && <S.Label>{label}</S.Label>}
      <S.ContainerInput
        hasIcon={!!icon}
        backgroundColor={backgroundColor}
        withBorder={withBorder}
      >
        {!!icon && icon}
        <S.TextInput placeholderTextColor={colors.gray500} {...props} />
      </S.ContainerInput>
      {errorMessage && <S.Error>{errorMessage}</S.Error>}
    </S.Wrapper>
  )
}
