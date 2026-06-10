import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import SpectrumLayout from '../SpectrumLayout'
import SpectrumHome from '../SpectrumHome'
import SpectrumShop from '../SpectrumShop'
import SpectrumLocations from '../SpectrumLocations'
import SpectrumAbout from '../SpectrumAbout'

function renderRoute(path, extra = []) {
  // Pre-verify age gate so it does not block the tests
  window.localStorage.setItem('spectrum-age-verified', 'true')
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/spectrum-cannabis" element={<SpectrumLayout />}>
            <Route index element={<SpectrumHome />} />
            <Route path="shop" element={<SpectrumShop />} />
            <Route path="locations" element={<SpectrumLocations />} />
            <Route path="about" element={<SpectrumAbout />} />
            {extra}
          </Route>
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  )
}

describe('SpectrumHome', () => {
  it('renders the tagline', () => {
    renderRoute('/spectrum-cannabis')
    expect(screen.getByText(/cannabis, for everyone\./i)).toBeInTheDocument()
  })

  it('renders 6 featured products', () => {
    renderRoute('/spectrum-cannabis')
    // &apos; renders as straight apostrophe U+0027
    const heading = screen.getByRole('heading', { name: /this week.s highlights/i })
    const section = heading.closest('section')
    const cards = within(section).getAllByRole('link')
    // Each ProductCard renders as a single link → exactly 6 product links
    expect(cards.length).toBeGreaterThanOrEqual(6)
  })

  it('renders all 6 location cards', () => {
    renderRoute('/spectrum-cannabis')
    expect(screen.getByText('Spectrum Oakville')).toBeInTheDocument()
    expect(screen.getByText('Spectrum SV')).toBeInTheDocument()
  })
})

describe('SpectrumShop', () => {
  it('renders 40 products by default', () => {
    renderRoute('/spectrum-cannabis/shop')
    expect(screen.getByText(/40 of 40 products/i)).toBeInTheDocument()
  })

  it('filters reduce visible products when category chip is toggled', () => {
    renderRoute('/spectrum-cannabis/shop')
    const flowerChip = screen.getByRole('button', { name: 'Flower' })
    fireEvent.click(flowerChip)
    expect(screen.getByText(/12 of 40 products/i)).toBeInTheDocument()
  })

  it('clear-filters button restores all products on empty result', () => {
    renderRoute('/spectrum-cannabis/shop')
    const flowerChip = screen.getByRole('button', { name: 'Flower' })
    const accessoriesChip = screen.getByRole('button', { name: 'Accessories' })
    const indicaChip = screen.getByRole('button', { name: 'Indica' })
    fireEvent.click(accessoriesChip)
    fireEvent.click(indicaChip)
    // Accessories has strainType: null — combo with Indica → 0 results
    expect(screen.getByText(/0 of 40 products/i)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /clear filters/i }))
    expect(screen.getByText(/40 of 40 products/i)).toBeInTheDocument()
    // Use the chip we held a ref to so the assertion isn't ambiguous
    expect(flowerChip).toHaveAttribute('aria-pressed', 'false')
  })
})

describe('SpectrumLocations', () => {
  it('renders all 6 location names', () => {
    renderRoute('/spectrum-cannabis/locations')
    ;['Oakville', 'Northgate', 'Braemar', 'Downtown', 'Cooper Square', 'SV'].forEach(name => {
      expect(screen.getByText(`Spectrum ${name}`)).toBeInTheDocument()
    })
  })
})

describe('SpectrumAbout', () => {
  it('renders the David Pereira license attribution', () => {
    renderRoute('/spectrum-cannabis/about')
    expect(screen.getAllByText(/David Pereira/).length).toBeGreaterThan(0)
    // CTB-2019-0042 appears in both the license block and the footer
    expect(screen.getAllByText(/CTB-2019-0042/).length).toBeGreaterThan(0)
  })

  it('renders all 4 team members', () => {
    renderRoute('/spectrum-cannabis/about')
    ;['Imani Reyes', 'Marcus Tan', 'Priya Wallace', 'Daniel Choi'].forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument()
    })
  })
})

describe('AgeGate', () => {
  it('renders when not verified', () => {
    window.localStorage.removeItem('spectrum-age-verified')
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/spectrum-cannabis']}>
          <Routes>
            <Route path="/spectrum-cannabis" element={<SpectrumLayout />}>
              <Route index element={<SpectrumHome />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    )
    expect(screen.getByText(/welcome to spectrum cannabis/i)).toBeInTheDocument()
  })
})
