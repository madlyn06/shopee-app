import { useForm } from 'react-hook-form'
import { Schema, schema } from 'src/utills/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from 'src/components/Input'
import { useMutation } from 'react-query'
import { registerApi } from 'src/apis/auth.api'
import _ from 'lodash'
import { isAxiosUnprocessableEntityError } from 'src/utills/ultill'
import { Response } from 'src/types/utill.type'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import Button from 'src/components/Button/Button'
type FormRegister = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])
const Register = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
    watch
  } = useForm<FormRegister>({
    resolver: yupResolver(registerSchema)
  })
  const registerMutation = useMutation(registerApi)
  const onSubmit = handleSubmit((data) => {
    registerMutation.mutate(_.omit(data, ['confirm_password']), {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (errors) => {
        if (isAxiosUnprocessableEntityError<Response<Omit<FormRegister, 'confirm_password'>>>(errors)) {
          setError('email', {
            message: errors.response?.data.data.email,
            type: 'Sever'
          })
        }
      }
    })
  })
  return (
    <div className='bg-orange'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-6 shadow-sm' onSubmit={onSubmit}>
              <div className='text-xl'>Đăng ký</div>
              <Input register={register} name='email' type='text' placeholder='Email' error={errors.email?.message} />

              <Input
                name='password'
                register={register}
                className='mt-2'
                type='password'
                placeholder='Password'
                error={errors.password?.message}
              />
              <Input
                name='confirm_password'
                register={register}
                className='mt-2'
                type='password'
                placeholder='Password'
                error={errors.confirm_password?.message}
              />
              <div className='mt-2'>
                <Button className='w-full bg-orange py-3 text-white' isLoading={registerMutation.isLoading}>
                  Đăng ký
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
