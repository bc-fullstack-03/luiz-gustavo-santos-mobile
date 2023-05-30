import { TextInputProps } from 'react-native'
import { Controller, Control } from 'react-hook-form'
import { useTheme } from 'styled-components/native'

import * as S from './styles'

type InputProps = {
  placeholder?: string
  control: Control
  name: string
  error?: string
} & TextInputProps

export const Input: React.FC<InputProps> = ({
  placeholder,
  control,
  name,
  error,
  ...props
}) => {
  const { colors } = useTheme()
  return (
    <>
      <Controller
        control={control}
        render={({ field: { value, onChange, ref } }) => (
          <S.Wrapper
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            placeholderTextColor={colors.gray100}
            ref={ref}
            {...props}
          />
        )}
        name={name}
      />
      {!!error && <S.Error>{error}</S.Error>}
    </>
  )
}
