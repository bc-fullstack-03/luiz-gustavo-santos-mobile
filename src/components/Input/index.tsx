import { TextInputProps, TextInput } from 'react-native'
import { useTheme } from 'styled-components/native'

import * as S from './styles'

type InputProps = {
  placeholder?: string
  error?: string
  ref?: React.Ref<TextInput>
} & TextInputProps

export const Input: React.FC<InputProps> = ({
  placeholder,
  error,
  ref,
  ...props
}) => {
  const { colors } = useTheme()
  return (
    <>
      <S.Wrapper
        placeholder={placeholder}
        placeholderTextColor={colors.gray100}
        ref={ref}
        {...props}
      />

      {!!error && <S.Error>{error}</S.Error>}
    </>
  )
}
