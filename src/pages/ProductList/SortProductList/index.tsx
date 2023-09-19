import { QueryConfig } from '../ProductList'
import classNames from 'classnames'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { omit } from 'lodash'
import { QueryParamsConfig } from 'src/types/product.type'
export default function SortProductList({ queryConfig }: { queryConfig: QueryConfig }) {
  const { sort_by = 'createdAt' } = queryConfig
  const navigate = useNavigate()
  const handleSort = (sortByValue: Exclude<QueryParamsConfig['sort_by'], undefined>) => {
    navigate({
      pathname: '/',
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }
  const handlePriceSort = (order: Exclude<QueryParamsConfig['order'], undefined>) => {
    console.log(order)
    navigate({
      pathname: '/',
      search: createSearchParams({
        ...queryConfig,
        sort_by: 'price',
        order: order
      }).toString()
    })
  }
  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sắp xếp theo</div>
          <button
            className={classNames(
              'h-8  px-4 text-center text-sm capitalize text-black hover:bg-orange/80 hover:text-white',
              {
                'bg-orange': sort_by === 'view',
                'bg-white': sort_by !== 'view'
              }
            )}
            onClick={() => handleSort('view')}
          >
            Phổ biến
          </button>
          <button
            className={classNames(
              'h-8 px-4 text-center text-sm capitalize text-black hover:bg-orange/80 hover:text-white',
              {
                'bg-orange': sort_by === 'createdAt',
                'bg-white': sort_by !== 'createdAt'
              }
            )}
            onClick={() => handleSort('createdAt')}
          >
            Mới nhất
          </button>
          <button
            className={classNames(
              'h-8 px-4 text-center text-sm capitalize text-black hover:bg-orange/80 hover:text-white',
              {
                'bg-orange': sort_by === 'sold',
                'bg-white': sort_by !== 'sold'
              }
            )}
            onClick={() => handleSort('sold')}
          >
            Bán chạy
          </button>
          <select
            className='h-8 bg-white px-4 text-left text-sm capitalize text-black outline-none hover:bg-slate-100'
            defaultValue='Giá'
            onChange={(e) => handlePriceSort(e.target.value as any)}
          >
            <option disabled>Giá</option>
            <option value='asc'>Giá: Thấp đến cao</option>
            <option value='desc'>Giá: Cao đến thấp</option>
          </select>
        </div>

        <div className='flex items-center'>
          <div>
            <span className='text-orange'>1</span>
            <span>/2</span>
          </div>
          <div className='ml-2'>
            <button className='h-8 cursor-not-allowed rounded-tl-sm rounded-bl-sm bg-white/60 px-3 shadow hover:bg-slate-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3 w-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </button>
            <button className='h-8 rounded-tr-sm rounded-br-sm bg-white px-3 shadow hover:bg-slate-100 '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3 w-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
