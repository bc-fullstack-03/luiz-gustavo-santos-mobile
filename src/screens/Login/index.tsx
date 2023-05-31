import { Platform } from 'react-native'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Input, Logo, Separator } from '../../components'

import * as S from './styles'

const loginUserSchema = z.object({
  email: z
    .string()
    .nonempty('O email é obrigatório')
    .email('Formato de email inválido'),
  password: z.string().nonempty('A senha é obrgatória')
})

type LoginUserFormData = z.infer<typeof loginUserSchema>

export function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginUserFormData>({
    resolver: zodResolver(loginUserSchema)
  })

  const onSubmit: SubmitHandler<LoginUserFormData> = async (data) => {
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
            render={({ field: { value, onChange, ref } }) => (
              <Input
                value={value}
                onChange={onChange}
                placeholder="Digite seu email"
                error={errors?.email?.message}
                ref={ref}
              />
            )}
            name="email"
          />
          <Separator size={24} />
          <Controller
            control={control}
            render={({ field: { value, onChange, ref } }) => (
              <Input
                value={value}
                onChange={onChange}
                placeholder="Digite seu email"
                error={errors?.password?.message}
                ref={ref}
              />
            )}
            name="password"
          />
          <Separator size={32} />
          <Button text="Entrar" onPress={handleSubmit(onSubmit)} />
        </S.Content>
      </S.ScrollViewStyled>
    </S.KeyboardAvoidingViewStyled>
  )
}
