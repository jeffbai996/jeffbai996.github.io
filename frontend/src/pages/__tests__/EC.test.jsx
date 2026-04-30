import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import EC from '../EC'

function renderPage() {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={['/ec']}>
        <EC />
      </MemoryRouter>
    </HelmetProvider>
  )
}

describe('EC page', () => {
  it('renders the Electoral Commission heading', () => {
    renderPage()
    expect(screen.getByRole('heading', { level: 1, name: /Electoral Commission/i })).toBeInTheDocument()
  })

  it('renders the not-yet-activated status banner', () => {
    renderPage()
    expect(screen.getByText(/NOT YET ACTIVATED/i)).toBeInTheDocument()
  })

  it('renders all 24 district codes (ED-01 through ED-24)', () => {
    renderPage()
    for (let i = 1; i <= 24; i++) {
      const code = `ED-${String(i).padStart(2, '0')}`
      expect(screen.getAllByText(code).length).toBeGreaterThan(0)
    }
  })

  it('district lookup resolves a known postal code', () => {
    renderPage()
    const input = document.getElementById('ec-postal')
    fireEvent.change(input, { target: { value: '40321' } })
    fireEvent.click(screen.getByRole('button', { name: /find district/i }))
    expect(screen.getAllByText(/ED-04/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Oakville Metro/).length).toBeGreaterThan(0)
  })

  it('voter status checker returns a known mock record', () => {
    renderPage()
    const input = screen.getByLabelText(/pre-registration reference/i)
    fireEvent.change(input, { target: { value: 'V-2026-00874' } })
    fireEvent.click(screen.getByRole('button', { name: /check status/i }))
    expect(screen.getByText(/Pre-Registered/i)).toBeInTheDocument()
    // 'V-2026-00874' appears in the input value and the result block; assert at least one
    expect(screen.getAllByText(/V-2026-00874/).length).toBeGreaterThan(0)
  })

  it('renders the four principal statutes', () => {
    renderPage()
    // Statutes are referenced in both the campaign finance prose and the
    // legislation section heading; use getAllByText for the multi-match case.
    expect(screen.getAllByText(/Electoral Act 2014/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Voter Registration Act 2018/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Campaign Finance Disclosure Act 2020/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Polling Operations Regulations 2022/i).length).toBeGreaterThan(0)
  })

  it('renders the three EC offices', () => {
    renderPage()
    expect(screen.getByText('Electoral Commission Headquarters')).toBeInTheDocument()
    expect(screen.getByText('EC Braemar County Office')).toBeInTheDocument()
    expect(screen.getByText('EC Records Annexe')).toBeInTheDocument()
  })
})
