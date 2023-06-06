import { useState } from 'react'
import { Platform, TouchableOpacity } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Ionicons from '@expo/vector-icons/Ionicons'
import Toast from 'react-native-toast-message'
import { useTheme } from 'styled-components/native'

import api from '../../services/api'
import { Button, Input, Logo, Separator, Text } from '../../components'
import { AuthStackParamList } from '../../routes/types'

import * as S from './styles'

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>
type FromData = {
  name: string
  email: string
  password: string
}

const registerUserSchema = yup.object({
  name: yup.string().min(3, 'O nome deve ter no mínimo 3 letras'),
  email: yup.string().email('Email inválido').required('Email é obrigatório.'),
  password: yup
    .string()
    .min(6, 'A senha deve conter no mínimo 6 caracteres')
    .required('A senha é obrigatória.')
})

export function Register({ navigation }: Props) {
  const [loading, setLoading] = useState(false)
  const theme = useTheme()
  const onSubmit = async (data: FromData) => {
    try {
      setLoading(true)
      await api.post('/security/register', {
        name: data.name,
        user: data.email,
        password: data.password
      })

      navigation.navigate('Login')
      Toast.show({
        type: 'success',
        text1: 'Cadastrado com sucesso'
      })
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Ocorreu um erro ao cadastrar.'
      })
      console.log('Register error', error)
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
          <Text color={theme.colors.gray500}>Cadastre-se e comece a usar!</Text>
          <Separator size={32} />
          <Formik
            initialValues={{ name: '', email: '', password: '' }}
            validationSchema={registerUserSchema}
            enableReinitialize
            onSubmit={onSubmit}
          >
            {({ values, handleChange, handleSubmit, errors, isValid }) => (
              <>
                <Input
                  label="Seu nome"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  placeholder="Digite seu nome"
                  errorMessage={errors?.name}
                  autoCorrect={false}
                  autoCapitalize="none"
                  icon={
                    <Ionicons
                      name="person-outline"
                      size={24}
                      color={theme.colors.gray500}
                    />
                  }
                />
                <Separator size={24} />

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
                  label="Sua senha"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  placeholder="**********"
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
                  text={loading ? 'Cadastrando...' : 'Cadastrar'}
                  disabled={!isValid || loading}
                  onPress={() => handleSubmit()}
                />
                <Separator size={16} />

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text size="xsmall" color={theme.colors.gray500}>
                    Já possui uma conta? Faça login!
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
