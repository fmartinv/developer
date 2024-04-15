import { useEffect, useState } from 'react'

const Example = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products')
      const data = await response.json()
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      setData(data.products)
      setLoading(true)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(data)

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Data 1</td>
            <td>Data 2</td>
          </tr>
          <tr></tr>
        </tbody>
      </table>
    </div>
  )
}

export default Example
