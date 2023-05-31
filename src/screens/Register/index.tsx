import { Platform } from 'react-native'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Input, Logo, Separator } from '../../components'

import * as S from './styles'

const loginUserSchema = z.object({
  name: z.string().min(3, 'O nome deve conter no mínimo 3 letras'),
  email: z
    .string()
    .nonempty('O email é obrigatório')
    .email('Formato de email inválido'),
  password: z.string().min(3, 'A senha deve conter no mínimo 8 digitos')
})

type RegisterUserFormData = z.infer<typeof loginUserSchema>

export function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterUserFormData>({
    resolver: zodResolver(loginUserSchema)
  })

  const onSubmit: SubmitHandler<RegisterUserFormData> = async (data) => {
    console.log({ data })
  }

  return (
    <S.KeyboardAvoidingViewStyled
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <S.ScrollViewStyled showsVerticalScrollIndicator={false}>
        <S.Content>
          <Logo />
          <Separator size={100} />
          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                onChange={onChange}
                placeholder="Digite seu nome"
                error={errors?.name?.message}
              />
            )}
            name="name"
          />
          <Separator size={24} />
          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                onChange={onChange}
                placeholder="Digite seu email"
                error={errors?.email?.message}
              />
            )}
            name="email"
          />
          <Separator size={24} />
          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                onChange={onChange}
                placeholder="Digite seu email"
                error={errors?.email?.message}
              />
            )}
            name="password"
          />
          <Separator size={32} />
          <Button text="Cadastrar" onPress={handleSubmit(onSubmit)} />
        </S.Content>
      </S.ScrollViewStyled>
    </S.KeyboardAvoidingViewStyled>
  )
}
