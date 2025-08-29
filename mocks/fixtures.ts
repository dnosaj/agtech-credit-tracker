import { CarbonCredit, CarbonFootprint, Farm, MarketData, RegenerativeScore, RevenueProjection, SupplyChainEmission } from '../types/domain'

export const mockFarm: Farm = {
  id: 'farm-001',
  name: 'Green Valley Farms',
  acres: 1200,
  location: 'Iowa, USA',
  primaryCrops: ['Corn', 'Soybeans'],
  soilType: 'Silty clay loam',
  climateZone: 'Humid Continental',
  establishedYear: 1985,
}

export const mockCarbonCredits: CarbonCredit[] = [
  { id: 'cc-001', amount: 120, price: 7.85, marketplace: 'Verra', date: '2024-04-12', status: 'verified' },
  { id: 'cc-002', amount: 95, price: 8.12, marketplace: 'Gold Standard', date: '2024-05-07', status: 'sold' },
  { id: 'cc-003', amount: 135, price: 7.6, marketplace: 'Verra', date: '2024-06-01', status: 'pending' },
]

export const mockCarbonFootprint: CarbonFootprint = {
  totalEmissions: 5200,
  sequestration: 1850,
  netFootprint: 3350,
  reductionPercentage: 14.2,
  practices: [],
}

export const mockRegenerativeScore: RegenerativeScore = {
  soilHealth: 68,
  biodiversity: 61,
  waterConservation: 72,
  carbonSequestration: 64,
  overall: 66,
}

export const mockWeatherData = {
  temperature: 77,
  humidity: 58,
  precipitation: 0.2,
  windSpeed: 9,
  conditions: 'Partly Cloudy',
  alerts: ['Heat Advisory', 'High Wind Watch'],
}

export const mockMarketData: MarketData = {
  verraPrice: 7.95,
  goldStandardPrice: 8.35,
  carbonCreditsPrice: 8.12,
  trend: 'up',
  lastUpdated: new Date().toISOString(),
}

export const mockRevenueProjection: RevenueProjection = {
  currentPractices: 185000,
  withImprovements: 245000,
  potentialIncrease: 60000,
  roi: 0.22,
  paybackPeriod: 3,
}

export const mockSupplyChainEmissions: SupplyChainEmission[] = [
  { source: 'Fertilizer Production', emissions: 1450, percentage: 34, optimizationPotential: 22 },
  { source: 'On-farm Diesel', emissions: 820, percentage: 19, optimizationPotential: 15 },
  { source: 'Transport', emissions: 610, percentage: 14, optimizationPotential: 18 },
  { source: 'Processing', emissions: 980, percentage: 23, optimizationPotential: 12 },
  { source: 'Packaging', emissions: 320, percentage: 7, optimizationPotential: 10 },
]

export const monthlyCarbonData = [
  { month: 'Jan', credits: 110, revenue: 840 },
  { month: 'Feb', credits: 125, revenue: 980 },
  { month: 'Mar', credits: 140, revenue: 1120 },
  { month: 'Apr', credits: 150, revenue: 1190 },
  { month: 'May', credits: 160, revenue: 1260 },
  { month: 'Jun', credits: 170, revenue: 1325 },
  { month: 'Jul', credits: 180, revenue: 1390 },
  { month: 'Aug', credits: 175, revenue: 1370 },
  { month: 'Sep', credits: 165, revenue: 1310 },
  { month: 'Oct', credits: 155, revenue: 1250 },
  { month: 'Nov', credits: 145, revenue: 1180 },
  { month: 'Dec', credits: 135, revenue: 1110 },
]

export const carbonPriceHistory = [
  { date: 'Jan', price: 7.1 },
  { date: 'Feb', price: 7.2 },
  { date: 'Mar', price: 7.4 },
  { date: 'Apr', price: 7.7 },
  { date: 'May', price: 7.9 },
  { date: 'Jun', price: 8.0 },
  { date: 'Jul', price: 8.1 },
]

export const peerBenchmarking = [
  { name: 'Peer A', score: 72 },
  { name: 'Peer B', score: 66 },
  { name: 'Peer C', score: 70 },
]

export const mockSustainablePractices = [
  { id: 'sp1', name: 'No-till Farming', category: 'tillage', status: 'implemented' },
  { id: 'sp2', name: 'Cover Crop Mix', category: 'cover-crops', status: 'implemented' },
  { id: 'sp3', name: 'Precision Fertilizer', category: 'fertilizer', status: 'evaluating' },
  { id: 'sp4', name: 'Diverse Rotation', category: 'rotation', status: 'planned' },
  { id: 'sp5', name: 'Managed Grazing', category: 'livestock', status: 'implemented' },
] as any


