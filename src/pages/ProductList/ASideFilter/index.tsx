import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button/Button'
import { CategoryType } from 'src/types/category.type'
import classNames from 'classnames'
import { QueryConfig } from '../ProductList'
import { useForm, Controller } from 'react-hook-form'
import InputNumber from 'src/components/InputNumber'
import { yupResolver } from '@hookform/resolvers/yup'
import { Schema, schema } from 'src/utills/rules'
import { NoUndefinedField } from 'src/utills/ultill'

type FormData = Pick<Schema, 'price_max' | 'price_min'>

const priceSchema = schema.pick(['price_min', 'price_max'])
export default function ASideFilter({
  category_data,
  queryConfig
}: {
  category_data: CategoryType[]
  queryConfig: QueryConfig
}) {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema)
  })
  const navigate = useNavigate()
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: '/',
      search: createSearchParams({
        ...queryConfig,
        price_min: data.price_min || '',
        price_max: data.price_max || ''
      }).toString()
    })
  })
  const handleFilterStar = (index: number) => {
    navigate({
      pathname: '/',
      search: createSearchParams({
        ...queryConfig,
        rating_filter: String(index)
      }).toString()
    })
  }
  return (
    <div className='py-4'>
      <Link to='' className='flex items-center gap-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
          />
        </svg>
        <p className='font-bold'>Tất cả danh mục</p>
      </Link>
      <div className='mt-4 h-[1px] bg-gray-300'></div>
      <ul className='ml-4 mt-4 flex flex-col gap-3'>
        {category_data.map((category) => {
          return (
            <li key={category._id}>
              <Link
                to={{
                  pathname: '/',
                  search: createSearchParams({
                    ...queryConfig,
                    category: category._id
                  }).toString()
                }}
              >
                <p
                  className={classNames({
                    'text-orange': category._id === queryConfig.category,
                    'text-black': category._id !== queryConfig.category
                  })}
                >
                  {category.name}
                </p>
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to='' className='mt-4 flex items-center gap-2'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='h-4 w-4 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        <p className='font-bold'>Bộ lọc tìm kiếm</p>
      </Link>
      <div className='mt-4 h-[1px] bg-gray-300'></div>
      <form className='mt-4' onSubmit={onSubmit}>
        <p>Khoảng giá</p>
        <div className='flex items-center'>
          <Controller
            control={control}
            name='price_min'
            render={({ field }) => {
              return (
                <InputNumber
                  value={field.value}
                  type='text'
                  placeholder='Từ'
                  classNameInput='outline-none w-full p-2 border border-gray-400'
                  onChange={(e) => {
                    field.onChange(e)
                    trigger('price_max')
                  }}
                />
              )
            }}
          />
          <div className='mx-2 shrink-0'>-</div>
          <Controller
            control={control}
            name='price_max'
            render={({ field }) => {
              return (
                <InputNumber
                  type='text'
                  value={field.value}
                  placeholder='Đến'
                  classNameInput='outline-none w-full p-2 border border-gray-400'
                  onChange={(e) => {
                    field.onChange(e)
                    trigger('price_min')
                  }}
                />
              )
            }}
          />
        </div>
        <div className='my-2 min-h-[20px] text-center text-sm text-orange'>{errors.price_max?.message}</div>
        <Button className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'>
          Áp dụng
        </Button>
      </form>
      <div className='mt-4 h-[1px] bg-gray-300'></div>
      <div className='mt-4'>
        <p>Đánh giá</p>
        <ul className='my-3'>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <li className='py-1 pl-2' key={index}>
                <div
                  className='flex cursor-pointer items-center text-sm'
                  onClick={() => handleFilterStar(5 - index)}
                  tabIndex={0}
                  role='button'
                  aria-hidden='true'
                >
                  {Array(5)
                    .fill(0)
                    .map((_, indexStar) => {
                      if (indexStar < 5 - index) {
                        return (
                          <svg viewBox='0 0 9.5 8' className='mr-1 h-4 w-4' key={indexStar}>
                            <defs>
                              <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                                <stop offset={0} stopColor='#ffca11' />
                                <stop offset={1} stopColor='#ffad27' />
                              </linearGradient>
                              <polygon
                                id='ratingStar'
                                points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                              />
                            </defs>
                            <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                              <g transform='translate(-876 -1270)'>
                                <g transform='translate(155 992)'>
                                  <g transform='translate(600 29)'>
                                    <g transform='translate(10 239)'>
                                      <g transform='translate(101 10)'>
                                        <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </svg>
                        )
                      }
                      return (
                        <svg viewBox='0 0 30 30' className='mr-1 h-4 w-4' key={indexStar}>
                          <defs>
                            <linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
                              <stop offset='0%' stopColor='#FFD211' />
                              <stop offset='100%' stopColor='#FFAD27' />
                            </linearGradient>
                          </defs>
                          <path
                            fill='none'
                            fillRule='evenodd'
                            stroke='url(#star__hollow)'
                            strokeWidth={2}
                            d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
                          />
                        </svg>
                      )
                    })}
                  {index !== 0 && <span>Trở lên</span>}
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className='my-4 h-[1px] bg-gray-300' />
      <Button className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'>
        Xóa tất cả
      </Button>
    </div>
  )
}
