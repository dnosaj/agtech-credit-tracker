import { SustainablePractice } from '../../types/domain'

export function calculateCarbonFootprint(practices: SustainablePractice[]) {
  const base = {
    totalEmissions: 5200,
    sequestration: 1850,
  }
  const totals = practices.reduce(
    (acc, p) => {
      acc.totalEmissions += Math.min(0, p.carbonImpact) // negative reduces emissions
      acc.sequestration += Math.max(0, Math.abs(p.carbonImpact) * 0.4)
      return acc
    },
    { ...base }
  )
  const netFootprint = Math.max(0, Math.round((totals.totalEmissions - totals.sequestration) * 100) / 100)
  const reductionPercentage = Math.round(((base.totalEmissions - totals.totalEmissions) / base.totalEmissions) * 1000) / 10
  return {
    totalEmissions: Math.round(totals.totalEmissions * 100) / 100,
    sequestration: Math.round(totals.sequestration * 100) / 100,
    netFootprint,
    reductionPercentage,
    practices,
  }
}

export function calculateROI(practices: SustainablePractice[]) {
  const totalCost = practices.reduce((sum, p) => sum + (p.cost || 0), 0)
  const averageRoi = practices.length
    ? practices.reduce((sum, p) => sum + (p.roi || 0), 0) / practices.length
    : 0
  const potentialIncrease = Math.round(60000 * Math.min(1, Math.max(0, averageRoi + practices.length * 0.02)))
  const roi = Math.round((averageRoi + 0.05) * 100) / 100
  const paybackPeriod = totalCost > 0 ? Math.max(1, Math.round((totalCost / Math.max(1, potentialIncrease)) * 10) / 10) : 2
  return { roi, paybackPeriod, potentialIncrease }
}

export function formatCurrency(value: number) {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
  } catch {
    return `$${Math.round(value).toLocaleString('en-US')}`
  }
}

export function formatNumber(value: number, digits: number = 0) {
  return Number(value).toLocaleString('en-US', { maximumFractionDigits: digits, minimumFractionDigits: digits })
}

export function formatPercentage(value: number, digits: number = 1) {
  return `${formatNumber(value, digits)}%`
}

export function getWeatherAlertColor(alert: string) {
  const lower = alert.toLowerCase()
  if (lower.includes('heat') || lower.includes('fire')) return 'text-red-600'
  if (lower.includes('wind') || lower.includes('storm')) return 'text-yellow-600'
  if (lower.includes('flood') || lower.includes('rain')) return 'text-blue-600'
  return 'text-gray-600'
}


