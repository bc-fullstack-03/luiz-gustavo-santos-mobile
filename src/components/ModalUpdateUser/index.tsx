import { Formik } from 'formik'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useTheme } from 'styled-components/native'

import { Input } from '../Input'
import { ModalBase } from '../Modal'
import { Separator } from '../Separator'

import { Button } from '../Button'

type ModalUpdateUserProps = {
  open?: boolean
  onClose?: () => void
}

export const ModalUpdateUser: React.FC<ModalUpdateUserProps> = ({
  onClose,
  open
}) => {
  const theme = useTheme()
  const onSubmit = () => {
    console.log('Teste')
  }
  return (
    <ModalBase
      transparent
      title="Atualize seus dados"
      visible={open}
      onRequestClose={onClose}
      onClose={onClose}
    >
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {({ values, handleChange, errors, isValid }) => (
          <>
            <Input
              label="Sua Senha"
              value={values.password}
              backgroundColor={theme.colors.mainBg}
              withBorder
              onChangeText={handleChange('password')}
              placeholder="*******"
              secureTextEntry
              errorMessage={errors?.password}
              autoCorrect={false}
              autoCapitalize="none"
              icon={
                <Ionicons
                  name="lock-closed-outline"
                  size={24}
                  color={theme.colors.gray500}
                />
              }
            />
            <Separator size={24} />
            <Input
              label="Confirme sua Senha"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPPassword')}
              placeholder="*******"
              secureTextEntry
              errorMessage={errors?.confirmPassword}
              autoCorrect={false}
              autoCapitalize="none"
              backgroundColor={theme.colors.mainBg}
              withBorder
              icon={
                <Ionicons
                  name="lock-closed-outline"
                  size={24}
                  color={theme.colors.gray500}
                />
              }
            />
            <Separator size={32} />
            <Button text="Salvar" disabled={!isValid} />
          </>
        )}
      </Formik>
    </ModalBase>
  )
}
