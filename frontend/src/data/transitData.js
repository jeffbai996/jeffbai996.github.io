/**
 * Praya Public Transit System Data
 * Comprehensive transit data for the Republic of Praya
 */

// =============================================================================
// MRT (Mass Rapid Transit) System
// =============================================================================

export const MRT_LINES = {
  L1: {
    id: 'L1',
    name: 'Praya Line',
    color: '#e11d48', // Rose red
    textColor: '#ffffff',
    type: 'mrt',
    description: 'North-South spine connecting Airport to Downtown via Pei Ho',
    operatingHours: { start: '05:30', end: '00:30' },
    frequency: { peak: 3, offPeak: 6, weekend: 8 },
    totalLength: 42.5, // km
    journeyTime: 58, // minutes end-to-end
    stations: [
      { id: 'L1-01', name: 'Praya International Airport', code: 'PIA', zone: 5, interchange: ['ISR'], facilities: ['airport', 'parking', 'bus'] },
      { id: 'L1-02', name: 'Airport City', code: 'APC', zone: 5, facilities: ['parking', 'bus'] },
      { id: 'L1-03', name: 'Northgate', code: 'NGT', zone: 4, facilities: ['parking', 'bus'] },
      { id: 'L1-04', name: 'Pei Ho', code: 'PEH', zone: 4, facilities: ['bus', 'hospital'] },
      { id: 'L1-05', name: 'University of Praya', code: 'UNI', zone: 3, interchange: ['L3'], facilities: ['bus'] },
      { id: 'L1-06', name: 'Science Park', code: 'SCP', zone: 3, facilities: ['bus'] },
      { id: 'L1-07', name: 'Upper East Side', code: 'UES', zone: 3, facilities: ['parking', 'bus'] },
      { id: 'L1-08', name: 'Surowski Valley', code: 'SVY', zone: 2, interchange: ['L2'], facilities: ['bus'] },
      { id: 'L1-09', name: 'Grand Praya Terminal', code: 'GPT', zone: 1, interchange: ['L2', 'L3', 'L4', 'ISR'], facilities: ['bus', 'shopping'] },
      { id: 'L1-10', name: 'Downtown', code: 'DWT', zone: 1, facilities: ['bus', 'government'] },
      { id: 'L1-11', name: 'Waterfront', code: 'WFT', zone: 1, interchange: ['L4'], facilities: ['ferry', 'bus'] },
      { id: 'L1-12', name: 'Western District', code: 'WDT', zone: 2, facilities: ['bus'] },
      { id: 'L1-13', name: 'Flower Island', code: 'FLI', zone: 2, facilities: ['ferry', 'parking'] },
      { id: 'L1-14', name: 'Southpoint', code: 'SPT', zone: 3, interchange: ['L2'], facilities: ['bus', 'parking'] },
      { id: 'L1-15', name: 'Industrial Park', code: 'IDP', zone: 3, facilities: ['bus'] },
      { id: 'L1-16', name: 'Praya South', code: 'PYS', zone: 4, facilities: ['parking', 'bus', 'depot'] }
    ]
  },

  L2: {
    id: 'L2',
    name: 'Center Line',
    color: '#2563eb', // Blue
    textColor: '#ffffff',
    type: 'mrt',
    description: 'East-West corridor through Downtown and Surowski Valley',
    operatingHours: { start: '05:30', end: '00:30' },
    frequency: { peak: 3, offPeak: 5, weekend: 7 },
    totalLength: 35.8,
    journeyTime: 48,
    stations: [
      { id: 'L2-01', name: 'Westlands', code: 'WLD', zone: 4, facilities: ['parking', 'bus'] },
      { id: 'L2-02', name: 'Lakeside', code: 'LKS', zone: 4, interchange: ['L4'], facilities: ['parking', 'bus'] },
      { id: 'L2-03', name: 'Western Hills', code: 'WHL', zone: 3, facilities: ['bus'] },
      { id: 'L2-04', name: 'Western District', code: 'WDT', zone: 3, facilities: ['bus', 'shopping'] },
      { id: 'L2-05', name: 'Beacon Hill', code: 'BCH', zone: 2, facilities: ['parking', 'bus'] },
      { id: 'L2-06', name: 'Surowski Valley', code: 'SVY', zone: 2, interchange: ['L1'], facilities: ['bus'] },
      { id: 'L2-07', name: 'Shanghai Road', code: 'SHR', zone: 1, facilities: ['bus'] },
      { id: 'L2-08', name: 'Grand Praya Terminal', code: 'GPT', zone: 1, interchange: ['L1', 'L3', 'L4', 'ISR'], facilities: ['bus', 'shopping'] },
      { id: 'L2-09', name: 'Downtown', code: 'DWT', zone: 1, facilities: ['bus', 'heritage'] },
      { id: 'L2-10', name: 'Cathedral', code: 'CTH', zone: 2, interchange: ['L3'], facilities: ['bus'] },
      { id: 'L2-11', name: 'Turing Hall', code: 'TRH', zone: 2, facilities: ['bus'] },
      { id: 'L2-12', name: 'Upper East Side', code: 'UES', zone: 3, facilities: ['bus', 'parking'] },
      { id: 'L2-13', name: 'Southpoint', code: 'SPT', zone: 3, interchange: ['L1'], facilities: ['bus', 'parking'] },
      { id: 'L2-14', name: 'Lower Surowski Valley', code: 'LSV', zone: 3, facilities: ['bus'] },
      { id: 'L2-15', name: 'East Terminal', code: 'ETM', zone: 4, interchange: ['ISR'], facilities: ['parking', 'bus', 'depot'] }
    ]
  },

  L3: {
    id: 'L3',
    name: 'Braemar Line',
    color: '#16a34a', // Green
    textColor: '#ffffff',
    type: 'mrt',
    description: 'Serves Braemar County and University of Praya',
    operatingHours: { start: '05:45', end: '00:15' },
    frequency: { peak: 4, offPeak: 7, weekend: 10 },
    totalLength: 28.3,
    journeyTime: 42,
    stations: [
      { id: 'L3-01', name: 'Braemar', code: 'BRM', zone: 5, facilities: ['parking', 'bus'] },
      { id: 'L3-02', name: 'Braemar County Centre', code: 'BCC', zone: 4, facilities: ['parking', 'bus', 'government'] },
      { id: 'L3-03', name: 'Taiping', code: 'TPG', zone: 4, facilities: ['bus'] },
      { id: 'L3-04', name: 'Northgate', code: 'NGT', zone: 3, facilities: ['bus'] },
      { id: 'L3-05', name: 'University of Praya', code: 'UNI', zone: 3, interchange: ['L1'], facilities: ['bus'] },
      { id: 'L3-06', name: 'Pei Ho General Hospital', code: 'PGH', zone: 2, facilities: ['hospital', 'bus'] },
      { id: 'L3-07', name: 'Art and Design Institute', code: 'ADI', zone: 2, facilities: ['bus'] },
      { id: 'L3-08', name: 'Grand Praya Terminal', code: 'GPT', zone: 1, interchange: ['L1', 'L2', 'L4', 'ISR'], facilities: ['bus', 'shopping'] },
      { id: 'L3-09', name: 'Holy Trinity Cathedral', code: 'HTC', zone: 2, facilities: ['bus'] },
      { id: 'L3-10', name: 'Cathedral', code: 'CTH', zone: 2, interchange: ['L2'], facilities: ['bus'] },
      { id: 'L3-11', name: 'Adelaide Street', code: 'ADS', zone: 3, facilities: ['bus', 'parking'] },
      { id: 'L3-12', name: 'Upper Surowski Valley', code: 'USV', zone: 3, facilities: ['bus', 'parking'] }
    ]
  },

  L4: {
    id: 'L4',
    name: 'Oakville Line',
    color: '#ea580c', // Orange
    textColor: '#ffffff',
    type: 'mrt',
    description: 'Circular line connecting Oakville and outer districts',
    operatingHours: { start: '06:00', end: '00:00' },
    frequency: { peak: 5, offPeak: 8, weekend: 12 },
    totalLength: 52.1,
    journeyTime: 78,
    isCircular: true,
    stations: [
      { id: 'L4-01', name: 'Grand Praya Terminal', code: 'GPT', zone: 1, interchange: ['L1', 'L2', 'L3', 'ISR'], facilities: ['bus', 'shopping'] },
      { id: 'L4-02', name: 'Waterfront', code: 'WFT', zone: 1, interchange: ['L1'], facilities: ['ferry', 'bus'] },
      { id: 'L4-03', name: 'Flower Island', code: 'FLI', zone: 2, facilities: ['bus'] },
      { id: 'L4-04', name: 'Nautical Club', code: 'NTC', zone: 2, facilities: ['parking', 'bus'] },
      { id: 'L4-05', name: 'Braemar Beach', code: 'BBH', zone: 3, facilities: ['bus'] },
      { id: 'L4-06', name: 'Oakville', code: 'OKV', zone: 3, facilities: ['parking', 'bus'] },
      { id: 'L4-07', name: 'Toranomon Gate', code: 'TRG', zone: 3, facilities: ['bus'] },
      { id: 'L4-08', name: 'Tencent Gardens', code: 'TCG', zone: 4, facilities: ['bus'] },
      { id: 'L4-09', name: 'Lakeside', code: 'LKS', zone: 4, interchange: ['L2'], facilities: ['parking', 'bus'] },
      { id: 'L4-10', name: 'Tsuen Lok Road', code: 'TLR', zone: 4, facilities: ['bus'] },
      { id: 'L4-11', name: 'Tamshui Bay', code: 'TSB', zone: 3, facilities: ['parking', 'bus'] },
      { id: 'L4-12', name: 'Ting Kau', code: 'TKU', zone: 3, facilities: ['bus'] },
      { id: 'L4-13', name: 'Alderney', code: 'ALY', zone: 2, facilities: ['bus', 'shopping'] },
      { id: 'L4-14', name: 'Metropolitan', code: 'MTP', zone: 2, facilities: ['bus'] }
      // Connects back to Grand Praya Terminal
    ]
  }
};

// =============================================================================
// ISR (Intercity/Suburban Rail)
// =============================================================================

export const ISR_LINES = {
  ISR: {
    id: 'ISR',
    name: 'Islands Surface Rail',
    color: '#7c3aed', // Purple
    textColor: '#ffffff',
    type: 'commuter',
    description: 'Commuter rail connecting Metropolitan and Braemar Counties',
    operatingHours: { start: '05:00', end: '01:00' },
    frequency: { peak: 10, offPeak: 20, weekend: 30 },
    routes: [
      {
        id: 'ISR-N',
        name: 'Northern Line',
        direction: 'North',
        stations: [
          { id: 'ISR-N01', name: 'Grand Praya Terminal', code: 'GPT', zone: 1, interchange: ['L1', 'L2', 'L3', 'L4'], platform: '1-4' },
          { id: 'ISR-N02', name: 'Pei Ho', code: 'PEH', zone: 3, platform: '1-2' },
          { id: 'ISR-N03', name: 'Northgate', code: 'NGT', zone: 5, platform: '1-2' },
          { id: 'ISR-N04', name: 'Braemar', code: 'BRM', zone: 6, platform: '1' },
          { id: 'ISR-N05', name: 'Oakville Central', code: 'OKC', zone: 7, platform: '1' },
          { id: 'ISR-N06', name: 'Praya International Airport', code: 'PIA', zone: 5, interchange: ['L1'], platform: '1-2' },
          { id: 'ISR-N07', name: 'Northfield', code: 'NTF', zone: 8, platform: '1', terminus: true }
        ],
        journeyTime: 65
      },
      {
        id: 'ISR-E',
        name: 'Eastern Line',
        direction: 'East',
        stations: [
          { id: 'ISR-E01', name: 'Grand Praya Terminal', code: 'GPT', zone: 1, interchange: ['L1', 'L2', 'L3', 'L4'], platform: '5-6' },
          { id: 'ISR-E02', name: 'East Terminal', code: 'ETM', zone: 4, interchange: ['L2'], platform: '1-2' },
          { id: 'ISR-E03', name: 'Upper Surowski Valley', code: 'USV', zone: 5, platform: '1' },
          { id: 'ISR-E04', name: 'Seaside', code: 'SSD', zone: 6, platform: '1' },
          { id: 'ISR-E05', name: 'Port Praya', code: 'PPY', zone: 7, facilities: ['port'], platform: '1', terminus: true }
        ],
        journeyTime: 48
      },
      {
        id: 'ISR-S',
        name: 'Southern Line',
        direction: 'South',
        stations: [
          { id: 'ISR-S01', name: 'Grand Praya Terminal', code: 'GPT', zone: 1, interchange: ['L1', 'L2', 'L3', 'L4'], platform: '7-8' },
          { id: 'ISR-S02', name: 'Flower Island', code: 'FLI', zone: 3, platform: '1-2' },
          { id: 'ISR-S03', name: 'Praya South', code: 'PYS', zone: 5, platform: '1' },
          { id: 'ISR-S04', name: 'Covina', code: 'CVN', zone: 6, platform: '1' },
          { id: 'ISR-S05', name: 'Canary Cove', code: 'CCV', zone: 7, platform: '1' },
          { id: 'ISR-S06', name: 'South Bay', code: 'SBY', zone: 8, platform: '1', terminus: true }
        ],
        journeyTime: 55
      }
    ]
  }
};

// =============================================================================
// HSR (High Speed Rail)
// =============================================================================

export const HSR_LINES = {
  HSR: {
    id: 'HSR',
    name: 'Praya High Speed Rail',
    color: '#dc2626', // Red
    textColor: '#ffffff',
    type: 'hsr',
    description: 'High-speed rail connecting major cities',
    operatingHours: { start: '06:00', end: '23:00' },
    maxSpeed: 350, // km/h
    routes: [
      {
        id: 'HSR-1',
        name: 'Capital Express',
        stations: [
          { id: 'HSR-01', name: 'Praya Central HSR', code: 'PCH', city: 'Praya', facilities: ['lounge', 'dining'] },
          { id: 'HSR-02', name: 'Midland HSR', code: 'MLH', city: 'Midland', journeyFromPraya: 28 },
          { id: 'HSR-03', name: 'Riverport HSR', code: 'RPH', city: 'Riverport', journeyFromPraya: 48 },
          { id: 'HSR-04', name: 'Wellington Central', code: 'WCH', city: 'Wellington', journeyFromPraya: 72, terminus: true }
        ],
        frequency: 30, // minutes
        classes: ['First', 'Business', 'Standard']
      },
      {
        id: 'HSR-2',
        name: 'Coastal Express',
        stations: [
          { id: 'HSR-01', name: 'Praya Central HSR', code: 'PCH', city: 'Praya', facilities: ['lounge', 'dining'] },
          { id: 'HSR-05', name: 'Seaside HSR', code: 'SSH', city: 'Seaside', journeyFromPraya: 35 },
          { id: 'HSR-06', name: 'Harbour City HSR', code: 'HCH', city: 'Harbour City', journeyFromPraya: 58, terminus: true }
        ],
        frequency: 45,
        classes: ['Business', 'Standard']
      }
    ]
  }
};

// =============================================================================
// Bus System
// =============================================================================

export const BUS_FRANCHISEES = {
  PBC: {
    id: 'PBC',
    name: 'Praya Bus Company',
    color: '#0891b2', // Cyan
    description: 'Primary urban bus operator serving central districts',
    founded: 1952,
    fleet: 850,
    routes: 156,
    coverage: ['Central', 'North', 'East'],
    dailyRidership: '420,000'
  },
  CBL: {
    id: 'CBL',
    name: 'Citybus Lines',
    color: '#f59e0b', // Amber
    description: 'Serving western and southern suburbs',
    founded: 1978,
    fleet: 620,
    routes: 98,
    coverage: ['West', 'South', 'Lakeside'],
    dailyRidership: '285,000'
  },
  NTB: {
    id: 'NTB',
    name: 'New Territories Bus',
    color: '#84cc16', // Lime
    description: 'Rural and outer district services',
    founded: 1985,
    fleet: 380,
    routes: 72,
    coverage: ['Outer Districts', 'Rural Areas', 'New Towns'],
    dailyRidership: '145,000'
  }
};

export const BUS_ROUTES = {
  // Praya Bus Company routes
  '1': { id: '1', operator: 'PBC', name: 'Central Circular', type: 'urban', frequency: { peak: 5, offPeak: 10 }, fare: 2.50, hours: '05:30-00:30' },
  '2': { id: '2', operator: 'PBC', name: 'Airport Express', type: 'express', frequency: { peak: 15, offPeak: 20 }, fare: 8.00, hours: '05:00-01:00' },
  '5': { id: '5', operator: 'PBC', name: 'University - Central', type: 'urban', frequency: { peak: 6, offPeak: 12 }, fare: 2.50, hours: '06:00-23:00' },
  '10': { id: '10', operator: 'PBC', name: 'North Express', type: 'express', frequency: { peak: 10, offPeak: 15 }, fare: 4.50, hours: '05:30-00:00' },
  '15': { id: '15', operator: 'PBC', name: 'Waterfront Loop', type: 'urban', frequency: { peak: 8, offPeak: 12 }, fare: 2.50, hours: '06:00-23:30' },
  '21': { id: '21', operator: 'PBC', name: 'Medical Centre Shuttle', type: 'urban', frequency: { peak: 10, offPeak: 15 }, fare: 2.50, hours: '06:00-22:00' },
  '33': { id: '33', operator: 'PBC', name: 'Financial District - Stadium', type: 'urban', frequency: { peak: 7, offPeak: 15 }, fare: 2.50, hours: '06:00-00:00' },

  // Citybus Lines routes
  '101': { id: '101', operator: 'CBL', name: 'West Express', type: 'express', frequency: { peak: 12, offPeak: 20 }, fare: 4.00, hours: '05:30-00:00' },
  '105': { id: '105', operator: 'CBL', name: 'Lakeside - Central', type: 'urban', frequency: { peak: 8, offPeak: 15 }, fare: 3.00, hours: '06:00-23:00' },
  '110': { id: '110', operator: 'CBL', name: 'South Circular', type: 'urban', frequency: { peak: 10, offPeak: 18 }, fare: 2.50, hours: '06:00-22:30' },
  '118': { id: '118', operator: 'CBL', name: 'Oakville - Beachside', type: 'urban', frequency: { peak: 12, offPeak: 20 }, fare: 3.00, hours: '06:00-23:00' },
  '125': { id: '125', operator: 'CBL', name: 'Sunset Express', type: 'express', frequency: { peak: 15, offPeak: 25 }, fare: 4.50, hours: '06:00-22:00' },

  // New Territories Bus routes
  '301': { id: '301', operator: 'NTB', name: 'Braemar Heights - Central', type: 'suburban', frequency: { peak: 15, offPeak: 30 }, fare: 5.50, hours: '05:30-23:00' },
  '305': { id: '305', operator: 'NTB', name: 'Forest Park Shuttle', type: 'feeder', frequency: { peak: 20, offPeak: 30 }, fare: 3.50, hours: '06:30-21:00' },
  '310': { id: '310', operator: 'NTB', name: 'Rural Express', type: 'express', frequency: { peak: 30, offPeak: 45 }, fare: 7.00, hours: '06:00-21:00' },
  '315': { id: '315', operator: 'NTB', name: 'New Towns Connector', type: 'suburban', frequency: { peak: 20, offPeak: 35 }, fare: 5.00, hours: '06:00-22:00' },
  '320': { id: '320', operator: 'NTB', name: 'Northfield Express', type: 'express', frequency: { peak: 25, offPeak: 40 }, fare: 8.50, hours: '05:30-22:00' }
};

// =============================================================================
// Fare System
// =============================================================================

export const FARE_ZONES = {
  1: { name: 'Central', baseFare: 1.80 },
  2: { name: 'Inner', baseFare: 2.20 },
  3: { name: 'Middle', baseFare: 2.80 },
  4: { name: 'Outer', baseFare: 3.40 },
  5: { name: 'Suburban', baseFare: 4.00 },
  6: { name: 'Extended 1', baseFare: 4.80 },
  7: { name: 'Extended 2', baseFare: 5.60 },
  8: { name: 'Extended 3', baseFare: 6.40 }
};

export const FARE_MATRIX = {
  // Zone crossings - fare is calculated based on zones crossed
  // Format: startZone-endZone: fare
  calculateFare: (startZone, endZone) => {
    const zoneDiff = Math.abs(endZone - startZone);
    const baseFares = [1.80, 2.20, 2.80, 3.40, 4.00, 4.80, 5.60, 6.40];
    const maxZone = Math.max(startZone, endZone);
    const baseFare = baseFares[Math.min(maxZone - 1, 7)];
    return baseFare + (zoneDiff * 0.40);
  }
};

export const FARE_TYPES = {
  adult: { name: 'Adult', multiplier: 1.0 },
  child: { name: 'Child (3-11)', multiplier: 0.5 },
  student: { name: 'Student', multiplier: 0.5 },
  senior: { name: 'Senior (65+)', multiplier: 0.5 },
  disabled: { name: 'Disabled', multiplier: 0.5 },
  infant: { name: 'Infant (under 3)', multiplier: 0 }
};

export const PASSES = [
  { id: 'day', name: 'Day Pass', price: 12.00, validity: '1 day', zones: 'All zones', description: 'Unlimited travel for 24 hours' },
  { id: 'week', name: 'Weekly Pass', price: 45.00, validity: '7 days', zones: 'All zones', description: 'Unlimited weekly travel' },
  { id: 'month', name: 'Monthly Pass', price: 150.00, validity: '30 days', zones: 'All zones', description: 'Best value for daily commuters' },
  { id: 'tourist3', name: 'Tourist Pass (3-Day)', price: 28.00, validity: '3 days', zones: 'All zones', description: 'Includes airport express' },
  { id: 'tourist7', name: 'Tourist Pass (7-Day)', price: 55.00, validity: '7 days', zones: 'All zones', description: 'Includes airport express + attractions discount' }
];

// =============================================================================
// HSR Fares (separate pricing)
// =============================================================================

export const HSR_FARES = {
  'PCH-MLH': { standard: 35, business: 55, first: 85 },
  'PCH-RPH': { standard: 58, business: 92, first: 145 },
  'PCH-WCH': { standard: 85, business: 135, first: 210 },
  'PCH-SSH': { standard: 42, business: 68, first: null },
  'PCH-HCH': { standard: 68, business: 108, first: null },
  'MLH-RPH': { standard: 28, business: 45, first: 72 },
  'MLH-WCH': { standard: 55, business: 88, first: 138 },
  'RPH-WCH': { standard: 32, business: 52, first: 82 },
  'SSH-HCH': { standard: 30, business: 48, first: null }
};

// =============================================================================
// Service Status
// =============================================================================

export const SERVICE_STATUS = {
  NORMAL: { code: 'normal', label: 'Good Service', color: '#16a34a' },
  MINOR_DELAYS: { code: 'minor', label: 'Minor Delays', color: '#f59e0b' },
  MAJOR_DELAYS: { code: 'major', label: 'Major Delays', color: '#ea580c' },
  SUSPENDED: { code: 'suspended', label: 'Suspended', color: '#dc2626' },
  PLANNED_CLOSURE: { code: 'planned', label: 'Planned Closure', color: '#6b7280' }
};

// Current service status (would be fetched from API in real implementation)
export const getCurrentServiceStatus = () => ({
  L1: { status: SERVICE_STATUS.NORMAL, message: null },
  L2: { status: SERVICE_STATUS.MINOR_DELAYS, message: 'Signal maintenance at Financial District. Expect 5-8 min delays.' },
  L3: { status: SERVICE_STATUS.NORMAL, message: null },
  L4: { status: SERVICE_STATUS.NORMAL, message: null },
  ISR: { status: SERVICE_STATUS.NORMAL, message: null },
  HSR: { status: SERVICE_STATUS.NORMAL, message: null },
  BUS: { status: SERVICE_STATUS.NORMAL, message: 'Route 2 diverted due to road works near Terminal 2.' }
});

// =============================================================================
// Timetable Generation
// =============================================================================

export function generateTimetable(lineId, direction = 'outbound', dayType = 'weekday') {
  const line = MRT_LINES[lineId] || ISR_LINES[lineId];
  if (!line) return [];

  const stations = line.stations || (line.routes && line.routes[0].stations);
  if (!stations) return [];

  const { start, end } = line.operatingHours;
  const frequency = dayType === 'weekend' ? line.frequency.weekend :
                    (dayType === 'peak' ? line.frequency.peak : line.frequency.offPeak);

  const startMinutes = parseInt(start.split(':')[0]) * 60 + parseInt(start.split(':')[1]);
  const endMinutes = parseInt(end.split(':')[0]) * 60 + parseInt(end.split(':')[1]) + (end < start ? 24 * 60 : 0);

  const timetable = [];
  const stationList = direction === 'inbound' ? [...stations].reverse() : stations;

  for (let time = startMinutes; time <= endMinutes; time += frequency) {
    const trainDepartures = stationList.map((station, index) => {
      const stationTime = time + (index * 2); // 2 minutes between stations on average
      const hours = Math.floor(stationTime / 60) % 24;
      const mins = stationTime % 60;
      return {
        station: station.name,
        code: station.code,
        time: `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
      };
    });
    timetable.push(trainDepartures);
  }

  return timetable;
}

// =============================================================================
// Journey Planning Helper
// =============================================================================

export function getAllStations() {
  const stations = new Map();

  // Add MRT stations
  Object.values(MRT_LINES).forEach(line => {
    line.stations.forEach(station => {
      if (!stations.has(station.code)) {
        stations.set(station.code, {
          ...station,
          lines: [line.id],
          type: 'mrt'
        });
      } else {
        stations.get(station.code).lines.push(line.id);
      }
    });
  });

  // Add ISR stations
  Object.values(ISR_LINES).forEach(service => {
    service.routes.forEach(route => {
      route.stations.forEach(station => {
        if (!stations.has(station.code)) {
          stations.set(station.code, {
            ...station,
            lines: ['ISR'],
            type: 'commuter'
          });
        } else if (!stations.get(station.code).lines.includes('ISR')) {
          stations.get(station.code).lines.push('ISR');
        }
      });
    });
  });

  return Array.from(stations.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export function findRoute(fromCode, toCode) {
  // Simplified route finding - in production would use proper graph algorithm
  const stations = getAllStations();
  const fromStation = stations.find(s => s.code === fromCode);
  const toStation = stations.find(s => s.code === toCode);

  if (!fromStation || !toStation) return null;

  // Check for direct route
  const commonLines = fromStation.lines.filter(l => toStation.lines.includes(l));
  if (commonLines.length > 0) {
    return {
      type: 'direct',
      line: commonLines[0],
      from: fromStation,
      to: toStation,
      changes: 0,
      estimatedTime: Math.abs((fromStation.zone || 1) - (toStation.zone || 1)) * 4 + 5
    };
  }

  // Find route with one interchange
  for (const fromLine of fromStation.lines) {
    const line = MRT_LINES[fromLine];
    if (!line) continue;

    for (const station of line.stations) {
      if (station.interchange) {
        for (const interchangeLine of station.interchange) {
          if (toStation.lines.includes(interchangeLine)) {
            return {
              type: 'interchange',
              segments: [
                { line: fromLine, from: fromStation, to: station },
                { line: interchangeLine, from: station, to: toStation }
              ],
              changes: 1,
              changeAt: station,
              estimatedTime: Math.abs((fromStation.zone || 1) - (toStation.zone || 1)) * 4 + 12
            };
          }
        }
      }
    }
  }

  return null;
}
