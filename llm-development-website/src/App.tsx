import React, { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import HistorySection from './components/HistorySection'
import BreakthroughSection from './components/BreakthroughSection'
import CognitiveSection from './components/CognitiveSection'
import Timeline from './components/Timeline'
import TrendsSection from './components/TrendsSection'
import ImpactSection from './components/ImpactSection'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'

interface LLMReportData {
  title: string
  date: string
  abstract: string
  sections: any
  milestones: any[]
  trends: any[]
  impacts: any
}

function App() {
  const [reportData, setReportData] = useState<LLMReportData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/llm-report.json')
        const data = await response.json()
        setReportData(data)
      } catch (error) {
        console.error('加载数据失败:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  if (!reportData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">加载失败</h1>
          <p className="text-gray-600">请刷新页面重试</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Navigation />
      <Hero data={reportData} />
      <HistorySection data={reportData.sections.history} />
      <BreakthroughSection data={reportData.sections.breakthrough} />
      <CognitiveSection data={reportData.sections.cognitive} />
      <Timeline milestones={reportData.milestones} />
      <TrendsSection trends={reportData.trends} />
      <ImpactSection impacts={reportData.impacts} />
      <Footer />
    </div>
  )
}

export default App
