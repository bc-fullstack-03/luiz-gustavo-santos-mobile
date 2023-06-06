import { useState } from 'react'
import { Platform, TouchableOpacity } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import * as yup from 'yup'
import Ionicons from '@expo/vector-icons/Ionicons'
import Toast from 'react-native-toast-message'
import { useTheme } from 'styled-components/native'

import { LoginBody, useAuth } from '../../context/AuthContext'
import { AuthStackParamList } from '../../routes/types'

import { Button, Input, Logo, Separator, Text } from '../../components'

import * as S from './styles'

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>

const loginUserSchema = yup.object({
  email: yup.string().required('Email é obrigatório.'),
  password: yup.string().required('A senha é obrigatória.')
})

export function Login({ navigation }: Props) {
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const theme = useTheme()

  const onSubmit = async (data: LoginBody) => {
    try {
      setLoading(true)
      await login(data)
      navigation.navigate('Home')
      Toast.show({
        type: 'success',
        text1: 'Login com sucesso'
      })
    } catch (error) {
      console.log('Login Error', error)
      Toast.show({
        type: 'error',
        text1: 'Credenciais inválidas'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <S.KeyboardAvoidingViewStyled
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <S.ScrollViewStyled showsVerticalScrollIndicator={false}>
        <S.Content>
          <Logo />
          <Separator size={16} />
          <Text size="xxlarge" bold>
            Sysmap Parrot
          </Text>
          <Separator size={8} />
          <Text color={theme.colors.gray500}>Faça login e comece a usar!</Text>
          <Separator size={32} />
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginUserSchema}
            enableReinitialize
            onSubmit={onSubmit}
          >
            {({ values, handleChange, handleSubmit, errors, isValid }) => (
              <>
                <Input
                  label="Endereço de e-mail"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholder="Digite seu email"
                  keyboardType="email-address"
                  errorMessage={errors?.email}
                  autoCorrect={false}
                  autoCapitalize="none"
                  icon={
                    <Ionicons
                      name="mail-outline"
                      size={24}
                      color={theme.colors.gray500}
                    />
                  }
                />

                <Separator size={24} />

                <Input
                  label="Sua Senha"
                  value={values.password}
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

                <Separator size={32} />
                <Button
                  text={loading ? 'Aguarde...' : 'Entrar'}
                  onPress={() => handleSubmit()}
                  disabled={!isValid || loading}
                />
                <Separator size={16} />
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}
                >
                  <Text size="xsmall" color={theme.colors.gray500}>
                    Não possui uma conta? Crie uma agora!
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </S.Content>
      </S.ScrollViewStyled>
    </S.KeyboardAvoidingViewStyled>
  )
}
