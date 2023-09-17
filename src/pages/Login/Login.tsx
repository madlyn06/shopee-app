import { useForm } from 'react-hook-form'
import { Schema, schema } from 'src/utills/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from 'src/components/Input'
import { useMutation } from 'react-query'
import { loginApi } from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utills/ultill'
import { Response } from 'src/types/utill.type'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import { useNavigate } from 'react-router-dom'
import Button from 'src/components/Button/Button'
import { saveProfileToLS } from 'src/utills/auth'
type FormLogin = Pick<Schema, 'email' | 'password'>
const registerSchema = schema.pick(['email', 'password'])
const Login = () => {
  const { setIsAuthenticated, setProfile, profile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors }
  } = useForm<FormLogin>({
    resolver: yupResolver(registerSchema)
  })
  const loginMutation = useMutation(loginApi)
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onError: (errors) => {
        if (isAxiosUnprocessableEntityError<Response<FormLogin>>(errors)) {
          setError('email', {
            message: errors.response?.data.data.email,
            type: 'Sever'
          })
        }
      },
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        console.log(profile)
        navigate('/')
      }
    })
  })
  return (
    <div className='bg-orange'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-6 shadow-sm' onSubmit={onSubmit}>
              <div className='text-xl'>Đăng nhập</div>
              <Input register={register} name='email' type='text' placeholder='Email' error={errors.email?.message} />
              <Input
                name='password'
                register={register}
                className='mt-2'
                type='password'
                placeholder='Password'
                error={errors.password?.message}
              />
              <div className='mt-2'>
                <Button className='w-full bg-orange py-3 uppercase text-white' isLoading={loginMutation.isLoading}>
                  Đăng nhập
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
