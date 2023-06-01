import { Platform } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import * as yup from 'yup'

import { LoginBody, useAuth } from '../../context/AuthContext'
import { AuthStackParamList } from '../../routes/types'

import { Button, Input, Logo, Separator } from '../../components'

import * as S from './styles'

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>

const loginUserSchema = yup.object({
  email: yup.string().required('Email é obrigatório.'),
  password: yup.string().required('A senha é obrigatória.')
})

export function Login({ navigation }: Props) {
  const { login } = useAuth()

  const onSubmit = async (data: LoginBody) => {
    try {
      await login(data)
      navigation.navigate('Home')
    } catch (error) {
      console.log('Login Error', error)
    }
  }

  return (
    <S.KeyboardAvoidingViewStyled
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <S.ScrollViewStyled showsVerticalScrollIndicator={false}>
        <S.Content>
          <Logo />
          <Separator size={100} />
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginUserSchema}
            enableReinitialize
            onSubmit={onSubmit}
          >
            {({ values, handleChange, handleSubmit, errors }) => (
              <>
                <Input
                  label="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholder="Digite seu email"
                  keyboardType="email-address"
                  error={errors?.email}
                  autoCorrect={false}
                />

                <Separator size={24} />

                <Input
                  label="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  placeholder="Digite seu email"
                  secureTextEntry
                  error={errors?.password}
                  autoCorrect={false}
                />

                <Separator size={32} />
                <Button text="Entrar" onPress={() => handleSubmit()} />
              </>
            )}
          </Formik>
        </S.Content>
      </S.ScrollViewStyled>
    </S.KeyboardAvoidingViewStyled>
  )
}
