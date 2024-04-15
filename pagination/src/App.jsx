import { useEffect, useState, useCallback } from 'react'
import Pagination from './Pagination/Pagination'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPAges, setTotalPages] = useState(0)
  const PRODUCT_URL = 'https://dummyjson.com/products'
  let limit = 10

  const cleanData = data => {
    return data.map(product => {
      return {
        id: product.id,
        title: product.title,
        images: product.images
      }
    })
  }

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
        const cleanedData = cleanData(data.products)

        setData(cleanedData)
        setTotalPages(data.total)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }, [currentPage, limit])

  useEffect(() => {
    fetchProducts()
  }, [currentPage, fetchProducts])

  return (
    <>
      <div className='products-container'>
        {data &&
          data.map(product => (
            <div className='products-container__item' key={product.id}>
              <img
                className='products-container__img'
                src={product.images[0]}
                alt={product.title}
              />
              {product.title}
            </div>
          ))}
      </div>

      {data && (
        <Pagination
          currentPage={currentPage}
          total={totalPAges}
          onPageChangeProp={page => setCurrentPage(page)}
          limit={limit}
        />
      )}
    </>
  )
}

export default App
