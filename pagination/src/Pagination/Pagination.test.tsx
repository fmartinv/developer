import { range } from './Pagination' // Assuming the function is exported for testing
import { describe, it, expect } from 'vitest'

describe('range function tests', () => {
  it('test_range_function_returns_correct_array', () => {
    const start = 1
    const end = 5
    const expectedResult = [1, 2, 3, 4, 5]
    const result = range(start, end)
    expect(result).toEqual(expectedResult)
  })

  it('test_range_function_with_start_greater_than_end', () => {
    const start = 5
    const end = 1
    const expectedResult = [5]
    const result = range(start, end)
    expect(result).toEqual(expectedResult)
  })

  it('test_range_function_with_non_number_parameters', () => {
    const start = 'a'
    const end = 'b'
    expect(() => {
      range(start as any, end as any)
    }).toThrowError()
  })
})
