import React from 'react'
import './Pagination.css'
import { range } from '../utils/utils.helpers'

/**
 * Renders a pagination component with buttons for navigating through pages.
 *
 * @param {number} currentPage - The current page number.
 * @param {number} total - The total number of items.
 * @param {number} limit - The maximum number of items per page.
 * @param {(page: number) => void} onPageChangeProp - Callback function for page change.
 */
const Pagination: React.FC<{
  currentPage: number
  total: number
  limit: number
  onPageChangeProp: (page: number) => void
}> = ({ currentPage, total, limit, onPageChangeProp }) => {
  const pagesCount = Math.ceil(total / limit)
  const pages = range(1, pagesCount)
  const onPageChange = (selectedPage: number) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= pagesCount &&
      selectedPage !== currentPage
    ) {
      return onPageChangeProp(selectedPage)
    }
  }

  return (
    <div className='pagination'>
      <button
        className={currentPage === 1 ? 'disabled' : ''}
        onClick={() => onPageChange(1)}
      >
        ⏮
      </button>
      <button
        className={currentPage === 1 ? 'disabled' : ''}
        onClick={() => onPageChange(currentPage - 1)}
      >
        prev
      </button>
      {pages.map(page => {
        return (
          <span
            className={
              currentPage === page
                ? 'pagination__item pagination__item--active'
                : 'pagination__item'
            }
            key={page}
            onClick={() => {
              onPageChange(page)
            }}
          >
            {page}
          </span>
        )
      })}

      <button
        className={currentPage === pagesCount ? 'disabled' : ''}
        onClick={() => onPageChange(currentPage + 1)}
      >
        next
      </button>
      <button
        className={currentPage === pagesCount ? 'disabled' : ''}
        onClick={() => onPageChange(pagesCount)}
      >
        ⏯
      </button>
    </div>
  )
}
export default Pagination
