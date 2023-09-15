import React from 'react'
import { range } from 'lodash'

interface Props {
  value?: Date
  onChange?: (value: Date) => void
  error?: string
}
export default function DateSelect({ error, onChange, value }: Props) {
  const [date, setDate] = React.useState({
    day: value?.getDay() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target
    console.log(value)
    const newDate = {
      ...date,
      [name]: Number(value)
    }
    setDate(newDate)
    console.log(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.day))
  }
  return (
    <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
      <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Ngày sinh</div>
      <div className='sm:w-[80%] sm:pl-5'>
        <div className='flex justify-between'>
          <select name='day' onChange={handleChange} className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
            <option disabled>Ngày</option>
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select name='month' onChange={handleChange} className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
            <option disabled>Tháng</option>
            {range(1, 13).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select name='year' onChange={handleChange} className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
            <option disabled>Năm</option>
            {range(1990, 2024).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='mt-1 min-h-[20px] text-sm text-orange'>{error}</div>
    </div>
  )
}
