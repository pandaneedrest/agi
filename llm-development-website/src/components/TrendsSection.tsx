import React from 'react'
import { TrendingUp, Eye, Brain, Zap, Bot, Shield } from 'lucide-react'

interface TrendsSectionProps {
  trends: Array<{
    title: string
    description: string
    icon: string
  }>
}

const TrendsSection: React.FC<TrendsSectionProps> = ({ trends }) => {
  const iconMap: { [key: string]: any } = {
    multimodal: Eye,
    reasoning: Brain,
    efficiency: Zap,
    agent: Bot,
    safety: Shield
  }

  const colorMap: { [key: string]: string } = {
    multimodal: 'from-purple-500 to-pink-600',
    reasoning: 'from-blue-500 to-indigo-600',
    efficiency: 'from-yellow-500 to-orange-600',
    agent: 'from-emerald-500 to-teal-600',
    safety: 'from-red-500 to-rose-600'
  }

  return (
    <section id="trends" className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-6">
            <TrendingUp size={32} className="text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            发展趋势
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            探索大型语言模型未来发展的五大关键方向
          </p>
        </div>

        {/* Trends Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {trends.map((trend, index) => {
            const Icon = iconMap[trend.icon] || Brain
            const colorClass = colorMap[trend.icon] || 'from-emerald-500 to-teal-600'
            
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${colorClass} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={28} className="text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                  {trend.title}
                </h3>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed">
                  {trend.description}
                </p>

                {/* Hover effect indicator */}
                <div className="mt-6 pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center text-emerald-600 font-medium">
                    <TrendingUp size={16} className="mr-2" />
                    <span className="text-sm">未来重点发展方向</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Future Vision */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-6 flex-shrink-0">
                  <TrendingUp size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    未来展望
                  </h3>
                  <p className="text-emerald-100 leading-relaxed text-lg">
                    大型语言模型的未来发展将是多元化、智能化和人性化的。从单一的文本处理到多模态融合，
                    从被动的工具到主动的智能体，从技术突破到伦理对齐，LLM正在朝着更加通用、高效、
                    安全的方向演进，最终成为人类智能的有力补充和延伸。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrendsSection
