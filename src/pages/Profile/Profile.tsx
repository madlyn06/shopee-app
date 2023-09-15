import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import Input from 'src/components/Input'
import { UserSchema, userSchema } from 'src/utills/rules'
import userApi from 'src/apis/user.api'
import DateSelect from '../User/components/DateSelect'
import { useForm, Controller } from 'react-hook-form'
import Button from 'src/components/Button/Button'
type FormData = Pick<UserSchema, 'name' | 'date_of_birth' | 'phone' | 'address' | 'avartar'>
const schema = userSchema.pick(['name', 'date_of_birth', 'phone', 'avartar', 'address'])
const Profile = () => {
  const {
    control,
    register,
    formState: { errors },
    setValue,
    handleSubmit
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      date_of_birth: new Date(1990, 0, 1),
      phone: '',
      address: '',
      avartar: ''
    },
    resolver: yupResolver(schema)
  })
  useEffect(() => {
    if (profile) {
      setValue('name', profile.name ? profile.name : '')
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
      setValue('phone', profile.phone ? profile.phone : '')
      setValue('address', profile.address ? profile.address : '')
    }
  }, [])

  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = data?.data.data
  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })
  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>{profile?.email}</div>
            </div>
          </div>
          <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                name='name'
                register={register}
                className=''
                placeholder='Tên'
                error={errors.name?.message}
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                name='phone'
                register={register}
                className=''
                placeholder='Tên'
                error={errors.phone?.message}
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                name='address'
                register={register}
                className=''
                placeholder='Tên'
                error={errors.address?.message}
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <DateSelect error={errors.date_of_birth?.message} onChange={onChange} value={value} />
            )}
            name='date_of_birth'
          />
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button
                className='flex h-9 items-center bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                type='submit'
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                src='https://cf.shopee.vn/file/d04ea22afab6e6d250a370d7ccc2e675_tn'
                alt=''
                className='w-full rounded-full object-cover'
              />
            </div>
            <input className='hidden' type='file' accept='.jpg,.jpeg,.png' />
            <button className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'>
              Chọn ảnh
            </button>
            <div className='mt-3 text-gray-400'>
              <div>Dụng lượng file tối đa 1 MB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Profile
