// Domain types for AgTech Carbon Credit Tracker

export interface Farm {
  id: string
  name: string
  acres: number
  location: string
  primaryCrops: string[]
  soilType: string
  climateZone: string
  establishedYear: number
}

export interface CarbonCredit {
  id: string
  amount: number
  price: number
  marketplace: string
  date: string
  status: 'pending' | 'verified' | 'sold'
}

export interface CarbonFootprint {
  totalEmissions: number
  sequestration: number
  netFootprint: number
  reductionPercentage: number
  practices: SustainablePractice[]
}

export interface SustainablePractice {
  id: string
  name: string
  category: 'tillage' | 'cover-crops' | 'fertilizer' | 'rotation' | 'livestock'
  carbonImpact: number
  cost: number
  roi: number
  implementationTime: string
  status: 'planned' | 'implemented' | 'evaluating'
}

export interface RegenerativeScore {
  soilHealth: number
  biodiversity: number
  waterConservation: number
  carbonSequestration: number
  overall: number
}

export interface WeatherData {
  temperature: number
  humidity: number
  precipitation: number
  windSpeed: number
  conditions: string
  alerts: string[]
}

export interface MarketData {
  verraPrice: number
  goldStandardPrice: number
  carbonCreditsPrice: number
  trend: 'up' | 'down' | 'stable'
  lastUpdated: string
}

export interface RevenueProjection {
  currentPractices: number
  withImprovements: number
  potentialIncrease: number
  roi: number
  paybackPeriod: number
}

export interface SupplyChainEmission {
  source: string
  emissions: number
  percentage: number
  optimizationPotential: number
}

