import * as yup from 'yup'

export const schema = yup
  .object({
    email: yup
      .string()
      .required('Bắt buộc nhập email')
      .email('Sai định dạng email')
      .max(160, 'Độ dài từ 5-160 ký tự')
      .min(5, 'Độ dài từ 5-160 ký tự'),
    password: yup
      .string()
      .required('Bắt buộc nhập password')
      .max(160, 'Độ dài từ 5-160 ký tự')
      .min(6, 'Độ dài từ 6-160 ký tự'),
    confirm_password: yup
      .string()
      .required('Bắt buộc nhập password')
      .max(160, 'Độ dài từ 5-160 ký tự')
      .min(6, 'Độ dài từ 6-160 ký tự')
      .oneOf([yup.ref('password')], 'Không khớp password')
      .oneOf([yup.ref('password')], 'Nhập lại password không khớp'),
    price_min: yup.string().test({
      name: 'price-is-not-allowed',
      message: 'Giá không phù hợp',
      test: function (value) {
        const { price_max } = this.parent as { price_min: string; price_max: string }
        if (price_max !== '' && value !== '') {
          return Number(price_max) >= Number(value)
        }
        return price_max !== '' || value !== ''
      }
    }),
    price_max: yup.string().test({
      name: 'price-is-not-allowed',
      message: 'Giá không phù hợp',
      test: function (value) {
        const { price_min } = this.parent as { price_min: string; price_max: string }
        if (price_min !== '' && value !== '') {
          return Number(price_min) <= Number(value)
        }
        return price_min !== '' || value !== ''
      }
    }),
    name: yup.string().trim().required('Bắt buộc nhập tên')
  })
  .required()

export const userSchema = yup.object({
  name: yup.string().trim().required('Bắt buộc nhập tên').max(160, 'Độ dài từ 5-160 ký tự'),
  phone: yup.string().max(20, 'Độ dài tối đa 20 ký tự'),
  address: yup.string().max(160, 'Độ dài tối đa 160 ký tự'),
  avartar: yup.string().max(1000, 'Độ dài tối đa là 1000 ký tự'),
  date_of_birth: yup.date().max(new Date(), 'Chọn ngày trong quá khứ'),
  password: schema.fields['password'],
  new_password: schema.fields['password'],
  confirm_password: schema.fields['confirm_password']
})
export type UserSchema = yup.InferType<typeof userSchema>
export type Schema = yup.InferType<typeof schema>
