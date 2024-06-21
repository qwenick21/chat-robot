import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '@/app/page'
 
describe('Home page', () => {
  it('renders home page message', () => {
    render(<Page />)
 
    const heading = screen.getByText(/Add or select a chat to start your journey/i);
    expect(heading).toBeInTheDocument()
  })
})