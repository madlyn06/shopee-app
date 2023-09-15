import { useQuery } from 'react-query'
import { getCategories, getProducts } from 'src/apis/product.api'
import useQueryParams from 'src/hooks/useQueryParams'
import ASideFilter from './ASideFilter'
import SortProductList from './SortProductList'
import Product from './Product'
import Pagination from './Pagination/Pagination'
import { useState } from 'react'
import { QueryParamsConfig } from 'src/types/product.type'
import { isUndefined, omitBy } from 'lodash'
import { useQueryConfig } from 'src/hooks/useQueryConfig'

export type QueryConfig = {
  [key in keyof QueryParamsConfig]: string
}

const ProductList = () => {
  const queryConfig = useQueryConfig()
  const { data } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return getProducts(queryConfig as any)
    }
  })

  const { data: category_data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return getCategories()
    }
  })
  return (
    <div className='bg-gray-200 py-6'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-3'>
            <ASideFilter queryConfig={queryConfig} category_data={category_data?.data.data || []} />
          </div>
          {data && (
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} />
              <div className='mt-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {data &&
                  data.data.data.products.map((product) => (
                    <div className='col-span-1 ' key={product._id}>
                      <Product product={product} />
                    </div>
                  ))}
              </div>
              <Pagination queryConfig={queryConfig} page_size={data.data.data.pagination.page_size} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList
