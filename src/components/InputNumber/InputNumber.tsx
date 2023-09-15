import { InputHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  classNameInput?: string
}
const InputNumber = ({
  error,
  classNameInput = 'w-full rounded border border-gray-400/60 p-3 outline-none focus:border-gray-400',
  onChange,
  className = 'mt-8',
  ...rest
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(e)
    }
  }
  return (
    <div className={className}>
      <input {...rest} className={classNameInput} onChange={handleChange} />
    </div>
  )
}

export default InputNumber
