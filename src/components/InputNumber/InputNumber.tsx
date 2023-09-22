import { InputHTMLAttributes, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}
const InputNumber = ({
  errorMessage,
  classNameError,
  classNameInput = 'w-full rounded border border-gray-400/60 p-3 outline-none focus:border-gray-400',
  onChange,
  value = '',
  className = 'mt-8',
  ...rest
}: InputNumberProps) => {
  const [localValue, setLocalValue] = useState<string>(value as string)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    console.log(value)
    if (/^\d+$/.test(value) || value === '') {
      onChange && onChange(e)
      setLocalValue(value)
    }
  }
  return (
    <div className={className}>
      <input {...rest} className={classNameInput} onChange={handleChange} value={value || localValue} />
      <div className={classNameError}></div>
    </div>
  )
}

export default InputNumber
