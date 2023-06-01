import { Platform } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'

import { Button, Input, Logo, Separator } from '../../components'

import * as S from './styles'

const registerUserSchema = yup.object({
  name: yup.string().min(3, 'O nome deve ter no mínimo 3 letras'),
  email: yup.string().email('Email inválido').required('Email é obrigatório.'),
  password: yup
    .string()
    .min(6, 'A senha deve conter no mínimo 6 caracteres')
    .required('A senha é obrigatória.')
})

export function Register() {
  const onSubmit = async () => {
    console.log('Register form')
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
            initialValues={{ name: '', email: '', password: '' }}
            validationSchema={registerUserSchema}
            enableReinitialize
            onSubmit={onSubmit}
          >
            {({ values, handleChange, handleSubmit, errors }) => (
              <>
                <Input
                  label="Nome"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  placeholder="Digite seu nome"
                  error={errors?.name}
                  autoCorrect={false}
                />
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
                  label="Senha"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  placeholder="**********"
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
