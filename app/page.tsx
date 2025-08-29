'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Leaf, 
  DollarSign, 
  Target,
  Cloud,
  AlertTriangle,
  BarChart3,
  Calculator,
  Award,
  TrendingDown,
  FileText,
  Settings
} from 'lucide-react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  Radar as RadarShape,
  RadarChart as RRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts'

import { mockFarm, mockCarbonCredits, mockCarbonFootprint, mockRegenerativeScore, mockWeatherData, mockMarketData, mockRevenueProjection, mockSupplyChainEmissions, monthlyCarbonData, carbonPriceHistory, peerBenchmarking, mockSustainablePractices } from '../mocks/fixtures'
import { calculateCarbonFootprint, calculateROI, formatCurrency, formatNumber, formatPercentage, getWeatherAlertColor } from '../lib/sim/calculations'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [realTimePrice, setRealTimePrice] = useState(mockMarketData.carbonCreditsPrice)

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimePrice(prev => {
        const variation = (Math.random() - 0.5) * 0.3
        return Math.round((prev + variation) * 100) / 100
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const tabs = [
    { id: 'overview', label: 'Dashboard', icon: BarChart3 },
    { id: 'calculator', label: 'Carbon Calculator', icon: Calculator },
    { id: 'scoring', label: 'Regenerative Scoring', icon: Award },
    { id: 'revenue', label: 'Revenue Estimator', icon: TrendingUp },
    { id: 'supply-chain', label: 'Supply Chain', icon: FileText }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AgTech Carbon Credit Tracker</h1>
                <p className="text-sm text-gray-600">Agricultural Sustainability Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Real-time Carbon Price</p>
                <p className="text-lg font-semibold text-green-600">${realTimePrice}</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'calculator' && <CalculatorTab />}
        {activeTab === 'scoring' && <ScoringTab />}
        {activeTab === 'revenue' && <RevenueTab />}
        {activeTab === 'supply-chain' && <SupplyChainTab />}
      </main>
    </div>
  )
}

// Overview Tab Component
function OverviewTab() {
  const totalCredits = mockCarbonCredits.reduce((sum, credit) => sum + credit.amount, 0)
  const totalRevenue = mockCarbonCredits.reduce((sum, credit) => sum + (credit.amount * credit.price), 0)

  return (
    <div className="space-y-8">
      {/* Hero Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Carbon Credits (YTD)"
          value={`${formatNumber(totalCredits)} tons`}
          change="+12.5%"
          changeType="positive"
          icon={Leaf}
          color="green"
        />
        <MetricCard
          title="Estimated Revenue"
          value={formatCurrency(totalRevenue)}
          change="+8.3%"
          changeType="positive"
          icon={DollarSign}
          color="blue"
        />
        <MetricCard
          title="Carbon Footprint Reduction"
          value={formatPercentage(mockCarbonFootprint.reductionPercentage)}
          change="+5.2%"
          changeType="positive"
          icon={TrendingDown}
          color="green"
        />
        <MetricCard
          title="Active Sustainable Practices"
          value={`${mockSustainablePractices.filter(p => p.status === 'implemented').length}/5`}
          change="+1"
          changeType="positive"
          icon={Target}
          color="purple"
        />
      </div>

      {/* Charts and Farm Profile Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Carbon Credits vs Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Carbon Credits vs Revenue Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyCarbonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <RechartsTooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="credits" stroke="#16a34a" name="Credits (tons)" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#2563eb" name="Revenue ($)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Farm Profile */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Farm Profile</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Farm Name</label>
              <input
                type="text"
                defaultValue={mockFarm.name}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Acres</label>
              <input
                type="number"
                defaultValue={mockFarm.acres}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                defaultValue={mockFarm.location}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Primary Crops</label>
              <input
                type="text"
                defaultValue={mockFarm.primaryCrops.join(', ')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Weather and Market Data Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weather Integration */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Cloud className="w-5 h-5 mr-2 text-blue-500" />
            Current Weather & Climate Impact
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Temperature</span>
              <span className="font-semibold">{mockWeatherData.temperature}°F</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Humidity</span>
              <span className="font-semibold">{mockWeatherData.humidity}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Conditions</span>
              <span className="font-semibold">{mockWeatherData.conditions}</span>
            </div>
            <div className="pt-2 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Climate Alerts:</p>
              {mockWeatherData.alerts.map((alert, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <AlertTriangle className={`w-4 h-4 ${getWeatherAlertColor(alert)}`} />
                  <span className={getWeatherAlertColor(alert)}>{alert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Data */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Carbon Credit Market Prices</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Verra</span>
              <span className="font-semibold text-green-600">${mockMarketData.verraPrice}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Gold Standard</span>
              <span className="font-semibold text-green-600">${mockMarketData.goldStandardPrice}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Carbon Credits</span>
              <span className="font-semibold text-green-600">${mockMarketData.carbonCreditsPrice}</span>
            </div>
            <div className="pt-2 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Trend:</span>
                <TrendingUp className={`w-4 h-4 ${mockMarketData.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                <span className={`text-sm font-medium ${mockMarketData.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {mockMarketData.trend === 'up' ? 'Rising' : 'Falling'}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Last updated: {new Date(mockMarketData.lastUpdated).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Metric Card Component
function MetricCard({ title, value, change, changeType, icon: Icon, color }: {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative'
  icon: any
  color: string
}) {
  const colorClasses = {
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600'
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <span className={`text-sm font-medium ${
          changeType === 'positive' ? 'text-green-600' : 'text-red-600'
        }`}>
          {change}
        </span>
        <span className="text-sm text-gray-500 ml-2">vs last month</span>
      </div>
    </motion.div>
  )
}

// Carbon Calculator Tab
function CalculatorTab() {
  type Selection = {
    tillage: 'no-till' | 'reduced-till' | 'conventional'
    cover: 'none' | 'single-species' | 'multi-species'
    fertilizer: 'broadcast' | 'precision'
    rotation: 'simple' | 'diverse'
    livestock: 'none' | 'integrated'
  }

  const [selection, setSelection] = useState<Selection>({
    tillage: 'reduced-till',
    cover: 'single-species',
    fertilizer: 'precision',
    rotation: 'diverse',
    livestock: 'none'
  })

  const mapping = {
    tillage: {
      'conventional': { carbonImpact: 0, cost: 0, roi: 0 },
      'reduced-till': { carbonImpact: -1.2, cost: 8000, roi: 0.15 },
      'no-till': { carbonImpact: -2.3, cost: 15000, roi: 0.18 },
    },
    cover: {
      'none': { carbonImpact: 0, cost: 0, roi: 0 },
      'single-species': { carbonImpact: -1.1, cost: 5000, roi: 0.20 },
      'multi-species': { carbonImpact: -1.8, cost: 8500, roi: 0.22 },
    },
    fertilizer: {
      'broadcast': { carbonImpact: 0, cost: 0, roi: 0 },
      'precision': { carbonImpact: -1.2, cost: 22000, roi: 0.15 },
    },
    rotation: {
      'simple': { carbonImpact: 0, cost: 0, roi: 0 },
      'diverse': { carbonImpact: -1.4, cost: 6000, roi: 0.17 },
    },
    livestock: {
      'none': { carbonImpact: 0, cost: 0, roi: 0 },
      'integrated': { carbonImpact: -1.5, cost: 18000, roi: 0.20 },
    }
  }

  const practices = [
    {
      id: 'tillage',
      name: 'Tillage Methods',
      options: [
        { value: 'conventional', label: 'Conventional' },
        { value: 'reduced-till', label: 'Reduced Till' },
        { value: 'no-till', label: 'No Till' },
      ]
    },
    {
      id: 'cover',
      name: 'Cover Crops',
      options: [
        { value: 'none', label: 'None' },
        { value: 'single-species', label: 'Single Species' },
        { value: 'multi-species', label: 'Multi-species' },
      ]
    },
    {
      id: 'fertilizer',
      name: 'Fertilizer Application',
      options: [
        { value: 'broadcast', label: 'Broadcast' },
        { value: 'precision', label: 'Precision' },
      ]
    },
    {
      id: 'rotation',
      name: 'Crop Rotation',
      options: [
        { value: 'simple', label: 'Simple' },
        { value: 'diverse', label: 'Diverse' },
      ]
    },
    {
      id: 'livestock',
      name: 'Livestock Integration',
      options: [
        { value: 'none', label: 'None' },
        { value: 'integrated', label: 'Integrated' },
      ]
    }
  ]

  const implementedPractices = [
    {
      id: 'p1',
      name: 'Tillage',
      category: 'tillage',
      status: 'implemented',
      implementationTime: '3 months',
      ...mapping.tillage[selection.tillage]
    },
    {
      id: 'p2',
      name: 'Cover Crops',
      category: 'cover-crops',
      status: 'implemented',
      implementationTime: '6 months',
      ...mapping.cover[selection.cover]
    },
    {
      id: 'p3',
      name: 'Fertilizer',
      category: 'fertilizer',
      status: 'implemented',
      implementationTime: '4 months',
      ...mapping.fertilizer[selection.fertilizer]
    },
    {
      id: 'p4',
      name: 'Rotation',
      category: 'rotation',
      status: 'implemented',
      implementationTime: '6 months',
      ...mapping.rotation[selection.rotation]
    },
    {
      id: 'p5',
      name: 'Livestock',
      category: 'livestock',
      status: 'implemented',
      implementationTime: '6 months',
      ...mapping.livestock[selection.livestock]
    },
  ] as any

  const currentFootprint = { ...mockCarbonFootprint, practices: [] as any }
  const improvedFootprint = calculateCarbonFootprint(implementedPractices as any)
  const roi = calculateROI(implementedPractices as any)

  const comparisonData = [
    { name: 'Total Emissions', current: currentFootprint.totalEmissions, improved: improvedFootprint.totalEmissions },
    { name: 'Sequestration', current: currentFootprint.sequestration, improved: improvedFootprint.sequestration },
    { name: 'Net Footprint', current: currentFootprint.netFootprint, improved: improvedFootprint.netFootprint },
  ]

  return (
    <div className="space-y-8">
      {/* Form + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Farming Practices</h3>
          <div className="space-y-4">
            {practices.map(section => (
              <div key={section.id} className="space-y-1">
                <label className="text-sm font-medium text-gray-700">{section.name}</label>
                <select
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={(selection as any)[section.id]}
                  onChange={(e) => setSelection(prev => ({ ...prev, [section.id]: e.target.value as any }))}
                >
                  {section.options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Carbon Impact & ROI</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-green-50 border border-green-100">
              <p className="text-sm text-gray-600">Carbon Reduction</p>
              <p className="text-2xl font-bold text-green-700">{formatNumber(currentFootprint.totalEmissions - improvedFootprint.totalEmissions, 2)} tons</p>
              <p className="text-xs text-green-700/70">vs current baseline</p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
              <p className="text-sm text-gray-600">Estimated Annual ROI</p>
              <p className="text-2xl font-bold text-blue-700">{formatNumber(roi.roi * 100)}%</p>
              <p className="text-xs text-blue-700/70">Payback: {roi.paybackPeriod} yrs</p>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
              <p className="text-sm text-gray-600">Revenue Increase</p>
              <p className="text-2xl font-bold text-purple-700">{formatCurrency(roi.potentialIncrease)}</p>
              <p className="text-xs text-purple-700/70">With selected practices</p>
            </div>
          </div>

          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Line type="monotone" dataKey="current" stroke="#9ca3af" name="Current" strokeWidth={2} />
                <Line type="monotone" dataKey="improved" stroke="#16a34a" name="With Improvements" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {implementedPractices
            .filter(p => p.carbonImpact < 0)
            .sort((a, b) => b.roi - a.roi)
            .map((p, idx) => (
              <div key={idx} className="p-4 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900">{p.name}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">ROI {formatNumber(p.roi * 100)}%</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Carbon impact: {formatNumber(Math.abs(p.carbonImpact), 2)} tons ↓</p>
                <p className="text-xs text-gray-500 mt-1">Est. implementation: {p.implementationTime}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

// Regenerative Scoring Tab
function ScoringTab() {
  const current = mockRegenerativeScore
  const target = {
    soilHealth: Math.min(100, Math.round(current.soilHealth * 1.15)),
    biodiversity: Math.min(100, Math.round(current.biodiversity * 1.2)),
    waterConservation: Math.min(100, Math.round(current.waterConservation * 1.1)),
    carbonSequestration: Math.min(100, Math.round(current.carbonSequestration * 1.18)),
  }

  const radarData = [
    { metric: 'Soil Health', current: current.soilHealth, target: target.soilHealth },
    { metric: 'Biodiversity', current: current.biodiversity, target: target.biodiversity },
    { metric: 'Water', current: current.waterConservation, target: target.waterConservation },
    { metric: 'Sequestration', current: current.carbonSequestration, target: target.carbonSequestration },
  ]

  const improvementItems = [
    { title: 'Increase cover crop diversity', impact: 'High', gain: '+8-12 points' },
    { title: 'Add compost and biochar amendments', impact: 'Medium', gain: '+5-9 points' },
    { title: 'Expand field-edge habitat', impact: 'High', gain: '+6-10 points' },
    { title: 'Upgrade irrigation efficiency', impact: 'Medium', gain: '+4-7 points' },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Regenerative Score Radar</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RRadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <RechartsTooltip />
                <Legend />
                <RadarShape name="Current" dataKey="current" stroke="#10b981" fill="#10b981" fillOpacity={0.35} />
                <RadarShape name="Target" dataKey="target" stroke="#2563eb" fill="#2563eb" fillOpacity={0.2} />
              </RRadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Certification Pathway</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-md border">
              <span className="text-gray-700">Organic Transition</span>
              <span className="text-sm px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">In Progress</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-md border">
              <span className="text-gray-700">Regenerative Standard</span>
              <span className="text-sm px-2 py-0.5 rounded-full bg-green-50 text-green-700">Eligible</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-md border">
              <span className="text-gray-700">Biodiversity Audit</span>
              <span className="text-sm px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-700">Scheduled</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Practice-specific Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {improvementItems.map((item, idx) => (
            <div key={idx} className="p-4 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
              <p className="font-medium text-gray-900">{item.title}</p>
              <p className="text-sm text-gray-600 mt-1">Impact: {item.impact}</p>
              <p className="text-xs text-gray-500 mt-1">Expected gain: {item.gain}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function RevenueTab() {
  const [adoption, setAdoption] = useState(0.6) // 60% adoption of recommended practices
  const [acres, setAcres] = useState<number>(mockFarm.acres)
  const [spotPrice, setSpotPrice] = useState(mockMarketData.carbonCreditsPrice)

  useEffect(() => {
    const t = setInterval(() => {
      setSpotPrice(prev => Math.round((prev + (Math.random() - 0.5) * 0.3) * 100) / 100)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  const projectedRevenue = Math.round(mockRevenueProjection.currentPractices + mockRevenueProjection.potentialIncrease * adoption)
  const projectedROI = Math.round((mockRevenueProjection.roi + adoption * 0.15) * 100) / 100

  // Extend price history with a simple forecast
  const forecast = 4
  const historyAndForecast = [...carbonPriceHistory]
  const last = carbonPriceHistory[carbonPriceHistory.length - 1]?.price || spotPrice
  for (let i = 1; i <= forecast; i++) {
    const month = `+${i}m`
    historyAndForecast.push({ date: month, price: Math.round((last * (1 + i * 0.01)) * 100) / 100 })
  }

  const scenarioData = [
    { name: 'Current', revenue: mockRevenueProjection.currentPractices },
    { name: 'Selected', revenue: projectedRevenue },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Scenario Controls</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-700">Practice Adoption ({Math.round(adoption * 100)}%)</label>
              <input type="range" min="0" max="1" step="0.05" value={adoption} onChange={e => setAdoption(parseFloat(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="text-sm text-gray-700">Acres</label>
              <input type="number" value={acres} onChange={e => setAcres(parseInt(e.target.value || '0'))} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
              <p className="text-xs text-gray-500 mt-1">Used for scale-only demos. Per-acre assumptions baked into model.</p>
            </div>
            <div className="p-3 rounded-md bg-green-50 border border-green-100">
              <p className="text-sm text-gray-700">Spot Carbon Price</p>
              <p className="text-2xl font-bold text-green-700">${spotPrice}</p>
              <p className="text-xs text-green-700/70">Ticker simulating live market</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
            <p className="text-sm text-gray-600">Projected Revenue</p>
            <p className="text-2xl font-bold text-blue-700">{formatCurrency(projectedRevenue)}</p>
            <p className="text-xs text-blue-700/70">Based on adoption level</p>
          </div>
          <div className="p-4 rounded-lg bg-green-50 border border-green-100">
            <p className="text-sm text-gray-600">ROI (est.)</p>
            <p className="text-2xl font-bold text-green-700">{formatNumber(projectedROI * 100)}%</p>
            <p className="text-xs text-green-700/70">Includes carbon credit premiums</p>
          </div>
          <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
            <p className="text-sm text-gray-600">Delta vs Current</p>
            <p className="text-2xl font-bold text-purple-700">{formatCurrency(projectedRevenue - mockRevenueProjection.currentPractices)}</p>
            <p className="text-xs text-purple-700/70">Annualized improvement</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Trends & Forecast</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historyAndForecast}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#16a34a" name="Price ($/ton)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Scenario Comparison</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scenarioData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Bar dataKey="revenue" fill="#2563eb" name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-blue-50 border border-blue-100 text-blue-800 rounded-lg p-4 text-sm">
        <p><strong>Note:</strong> This estimator uses mocked pricing and simplified ROI assumptions for demo purposes. In application mode, this will integrate with marketplace APIs (Verra, Gold Standard) and real farm data.</p>
      </div>
    </div>
  )
}

function SupplyChainTab() {
  const COLORS = ['#16a34a', '#22c55e', '#86efac', '#2563eb', '#60a5fa']

  const exportCSV = () => {
    const header = 'Source,Emissions (tons),Percent,Optimization Potential (%)\n'
    const rows = mockSupplyChainEmissions
      .map(r => `${r.source},${r.emissions},${r.percentage},${r.optimizationPotential}`)
      .join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'supply-chain-emissions.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emissions Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Emissions by Source</h3>
            <button onClick={exportCSV} className="text-sm px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50">Export CSV</button>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={mockSupplyChainEmissions} dataKey="emissions" nameKey="source" outerRadius={100} label>
                  {mockSupplyChainEmissions.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Optimization Potential */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Potential by Source</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockSupplyChainEmissions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" />
                <YAxis />
                <RechartsTooltip />
                <Bar dataKey="optimizationPotential" fill="#16a34a" name="Potential (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Details Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Supplier Sustainability Scorecards</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-2 pr-4">Source</th>
                <th className="py-2 pr-4">Emissions (tons)</th>
                <th className="py-2 pr-4">Share</th>
                <th className="py-2 pr-4">Optimization Potential</th>
              </tr>
            </thead>
            <tbody>
              {mockSupplyChainEmissions.map((row, idx) => (
                <tr key={idx} className="border-t">
                  <td className="py-2 pr-4 text-gray-900">{row.source}</td>
                  <td className="py-2 pr-4">{formatNumber(row.emissions, 1)}</td>
                  <td className="py-2 pr-4">{formatNumber(row.percentage, 1)}%</td>
                  <td className="py-2 pr-4">{row.optimizationPotential}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance */}
      <div className="bg-green-50 border border-green-100 text-green-800 rounded-lg p-4 text-sm">
        <p><strong>Compliance Tracking:</strong> This prototype shows structure for certification status and audit scheduling. In application mode, we will integrate with certification APIs and logistics systems to track chain-of-custody and transport emissions automatically.</p>
      </div>
    </div>
  )
}
