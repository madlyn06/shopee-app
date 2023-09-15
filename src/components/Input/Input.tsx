import { InputHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<any>
  error?: string
  className?: string
  name?: string
  classNameInput?: string
}
const Input = ({
  register,
  error,
  className = 'mt-8',
  name,
  classNameInput = 'w-full rounded border border-gray-400/60 p-3 outline-none focus:border-gray-400',
  ...rest
}: Props) => {
  const newRegister = register && name ? register(`${name}`) : {}
  return (
    <div className={className}>
      <input {...rest} {...newRegister} className={classNameInput} />
      <div className='mt-1 min-h-[20px] text-sm text-orange'>{error}</div>
    </div>
  )
}

export default Input
