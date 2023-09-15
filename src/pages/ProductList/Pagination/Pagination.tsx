import classNames from 'classNames'
import { useState } from 'react'
import { createSearchParams, Link } from 'react-router-dom'
import { QueryConfig } from '../ProductList'

const RANGE = 2
export default function Pagination({ queryConfig, page_size }: { queryConfig: QueryConfig; page_size: number }) {
  const page = Number(queryConfig.page)

  const renderPaginate = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <button className='rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm' key={index}>
            ...
          </button>
        )
      }
      return null
    }
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <button className='rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm' key={index}>
            ...
          </button>
        )
      }
      return null
    }
    return Array(page_size)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < page_size - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page >= RANGE * 2 + 1 && page < page_size - RANGE * 2) {
          if (pageNumber > RANGE && pageNumber < page - RANGE) {
            return renderDotAfter(index)
          } else if (pageNumber > page + RANGE && pageNumber < page_size - RANGE + 1) {
            return renderDotBefore(index)
          }
        } else if (pageNumber < page - RANGE && pageNumber > RANGE) {
          return renderDotAfter(index)
        }

        return (
          <Link
            to={{
              pathname: `/`,
              search: createSearchParams({
                ...queryConfig,
                page: String(pageNumber)
              }).toString()
            }}
            className={classNames('rounded-md border bg-white px-3 py-2 shadow-sm', {
              'border-blue-500': page === pageNumber,
              'border-gray-300': page !== pageNumber
            })}
            key={index}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='mt-6 flex justify-center gap-2'>
      <button className='rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm'>Prev</button>
      {renderPaginate()}
      <button className='rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm'>Next</button>
    </div>
  )
}
