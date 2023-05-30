import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Container, Input, Logo } from '../../components'

const loginUserSchema = z.object({
  email: z
    .string()
    .nonempty('O email é obrigatório')
    .email('Formato de email inválido'),
  password: z.string().nonempty('A senha é obrgatória')
})

// type LoginUserFormData = z.infer<typeof loginUserSchema>
type FormData = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
}

export function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(loginUserSchema)
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log({ data })
  }

  return (
    <Container>
      <Logo />
      <Input
        placeholder="Digite seu email"
        name="email"
        control={control}
        error={errors?.email?.message as string}
      />
      <Input
        placeholder="*******"
        name="password"
        control={control}
        error={errors?.password?.message as string}
      />
      <Button text="Entrar" onPress={handleSubmit(onSubmit)} />
    </Container>
  )
}
