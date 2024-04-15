import { useEffect, useState, useCallback } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPAges, setTotalPages] = useState(0)
  const PRODUCT_URL = 'https://dummyjson.com/products'
  let limit = 10

  const fetchProducts = useCallback(async () => {
    try {
      const skipLimit = currentPage * limit - 10

      const response = await fetch(
        `${PRODUCT_URL}?limit=${limit}&skip=${skipLimit}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }

      const data = await response.json()

      if (data) {
        setData(data.products)
        setTotalPages(data.total / 10)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }, [currentPage, limit])

  useEffect(() => {
    fetchProducts()
  }, [currentPage, fetchProducts])

  const selectedPage = selectedPage => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPAges &&
      selectedPage !== currentPage
    ) {
      setCurrentPage(selectedPage)
    }
  }

  return (
    <>
      <div className='products-container'>
        {data &&
          data.map(product => <div key={product.id}>{product.title}</div>)}
      </div>
      {data && (
        <div className='pagination'>
          <button onClick={() => selectedPage(currentPage - 1)}>◀ </button>
          {[...Array(totalPAges)].map((_, i) => {
            return (
              <span
                key={i}
                onClick={() => selectedPage(i + 1)}
                className={
                  currentPage === i + 1
                    ? 'pagination__item pagination__item--active'
                    : 'pagination__item'
                }
              >
                {i + 1}
              </span>
            )
          })}

          <button onClick={() => selectedPage(currentPage + 1)}>▶ </button>
        </div>
      )}
    </>
  )
}

export default App
