// Spectrum Cannabis store locations. 6 total.
// `status` is 'open' for all in v1; flips to 'closed' for Oakville/Northgate/Braemar in v2.
// `county` and `district` from the Praya canon.

export const SPECTRUM_LOCATIONS = [
  {
    id: 'oakville',
    name: 'Spectrum Oakville',
    isFlagship: true,
    district: 'Oakville',
    county: 'Braemar County',
    address: '80 Leman Street, Oakville',
    hours: 'Mon–Sun · 10:00–22:00',
    phone: '(010) 311-2201',
    blurb: 'Our flagship store. Two floors, the full catalog, knowledgeable staff.',
    status: 'open'
  },
  {
    id: 'northgate',
    name: 'Spectrum Northgate',
    isFlagship: false,
    district: 'Northgate',
    county: 'Braemar County',
    address: '14 Skamania Avenue, Northgate',
    hours: 'Mon–Sun · 10:00–22:00',
    phone: '(010) 311-2202',
    blurb: 'Our community store in Northgate. Quick stops, local crowd.',
    status: 'open'
  },
  {
    id: 'braemar',
    name: 'Spectrum Braemar',
    isFlagship: false,
    district: 'Braemar',
    county: 'Braemar County',
    address: '3 Kootenai Crescent, Braemar',
    hours: 'Mon–Sun · 10:00–22:00',
    phone: '(010) 311-2203',
    blurb: 'A short walk from County Hall. Our oldest location after Oakville.',
    status: 'open'
  },
  {
    id: 'downtown',
    name: 'Spectrum Downtown',
    isFlagship: false,
    district: 'Downtown',
    county: null,
    address: '210 Promenade, Downtown',
    hours: 'Mon–Sun · 10:00–22:00',
    phone: '(010) 311-2204',
    blurb: 'In the heart of Downtown. Late-night foot traffic, full catalog.',
    status: 'open'
  },
  {
    id: 'cooper-square',
    name: 'Spectrum Cooper Square',
    isFlagship: false,
    district: 'Western',
    county: null,
    address: '7 Cooper Square, Western District',
    hours: 'Mon–Sun · 10:00–22:00',
    phone: '(010) 311-2205',
    blurb: 'A neighborhood storefront in the Western district.',
    status: 'open'
  },
  {
    id: 'sv',
    name: 'Spectrum SV',
    isFlagship: false,
    district: 'Surowski Valley',
    county: null,
    address: '1 Cultivation Way, Surowski Valley',
    hours: 'Mon–Sun · 10:00–22:00',
    phone: '(010) 311-2206',
    blurb: 'Adjacent to our cultivation facility. Tours by appointment.',
    status: 'open'
  }
]
