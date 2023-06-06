import { useState } from 'react'
import { Formik } from 'formik'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useTheme } from 'styled-components/native'
import * as yup from 'yup'
import Toast from 'react-native-toast-message'

import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'

import { Input } from '../Input'
import { ModalBase } from '../Modal'
import { Separator } from '../Separator'
import { Button } from '../Button'

type ModalUpdateUserProps = {
  open?: boolean
  onClose?: () => void
}

type UpdateUserFormData = {
  password: string
  confirmPassword: string
}

const schemaValidation = yup.object({
  password: yup
    .string()
    .min(6, 'A senha de ter no mínimo 6 caracteres')
    .required('A senha é obrigatória'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'As senhas devem ser iguais')
})

export const ModalUpdateUser: React.FC<ModalUpdateUserProps> = ({
  onClose,
  open
}) => {
  const [loading, setLoading] = useState(false)

  const theme = useTheme()

  const { logout } = useAuth()

  const onSubmit = async (values: UpdateUserFormData) => {
    try {
      setLoading(true)

      await api.put('/users/me', {
        password: values.password
      })

      await logout()

      Toast.show({
        text1: 'Dados atualizados com sucesso.',
        text2: 'Faça login novamente para continuar.',
        type: 'success'
      })
    } catch (error) {
      Toast.show({
        text1: 'Ocorreu um erro ao atualizar os dados.',
        type: 'error'
      })
      console.log('Update user', error)
    } finally {
      setLoading(false)
    }
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
        validationSchema={schemaValidation}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {({ values, handleChange, errors, handleSubmit, isValid }) => (
          <>
            <Input
              label="Nova Senha"
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
              label="Confirme a nova senha"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
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
            <Button
              text={loading ? 'Salvando...' : 'Salvar'}
              disabled={!isValid || loading}
              onPress={() => handleSubmit()}
            />
          </>
        )}
      </Formik>
    </ModalBase>
  )
}
