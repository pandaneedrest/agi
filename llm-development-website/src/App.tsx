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
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('开始加载数据...')
        const response = await fetch('./data/llm-report.json')
        console.log('Response status:', response.status)
        console.log('Response ok:', response.ok)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('数据加载成功:', data)
        setReportData(data)
      } catch (error) {
        console.error('加载数据失败:', error)
        console.error('Error details:', error.message)
        setError(error instanceof Error ? error.message : '未知错误')
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
        <div className="text-center max-w-2xl mx-auto p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">加载失败</h1>
          <p className="text-gray-600 mb-4">请刷新页面重试</p>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
              <p className="text-red-700 text-sm">错误详情: {error}</p>
            </div>
          )}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <p className="text-blue-700 text-sm">
              当前路径: {window.location.href}<br/>
              尝试获取: {window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '') + '/data/llm-report.json'}
            </p>
          </div>
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
