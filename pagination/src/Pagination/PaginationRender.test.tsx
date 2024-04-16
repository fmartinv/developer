import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Pagination from './Pagination'

describe('App', () => {
  it('renders the App component', () => {
    render(
      <Pagination
        currentPage={1}
        total={10}
        limit={10}
        onPageChangeProp={page => page}
      />
    )

    screen.debug()
  })

  it('displays correct pagination information', () => {
    // Render Pagination component with different props
    render(
      <Pagination
        currentPage={2}
        total={20}
        limit={10}
        onPageChangeProp={page => page}
      />
    )

    expect(screen.queryByText('1')).toBeTruthy()
  })
})
