import React from 'react'
import { Brain, ArrowRight, Lightbulb, Network, Cpu, Sparkles } from 'lucide-react'

interface CognitiveSectionProps {
  data: {
    title: string
    content: string
    paradigms: Array<{
      era: string
      paradigm: string
      description: string
    }>
  }
}

const CognitiveSection: React.FC<CognitiveSectionProps> = ({ data }) => {
  const icons = [Brain, Network, Cpu, Sparkles]
  const colors = [
    'from-red-400 to-pink-500',
    'from-orange-400 to-yellow-500', 
    'from-emerald-400 to-teal-500',
    'from-purple-400 to-indigo-500'
  ]

  return (
    <section id="cognitive" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mb-6">
            <Lightbulb size={32} className="text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {data.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {data.content}
          </p>
        </div>

        {/* Cognitive Evolution Flow */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Background pattern */}
            <div className="absolute inset-0 overflow-hidden">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="cognitive-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <circle cx="15" cy="15" r="1" fill="rgb(99 102 241 / 0.1)"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cognitive-grid)" />
              </svg>
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {data.paradigms.map((paradigm, index) => {
                const Icon = icons[index]
                const colorClass = colors[index]
                
                return (
                  <div key={index} className="relative group">
                    {/* Connection arrow for desktop */}
                    {index < data.paradigms.length - 1 && (
                      <div className="hidden xl:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                        <ArrowRight size={24} className="text-gray-300 group-hover:text-emerald-500 transition-colors duration-300" />
                      </div>
                    )}
                    
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 h-full">
                      {/* Era badge */}
                      <div className="text-sm font-medium text-gray-500 mb-3">
                        {paradigm.era}
                      </div>
                      
                      {/* Icon */}
                      <div className={`w-16 h-16 bg-gradient-to-br ${colorClass} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={28} className="text-white" />
                      </div>
                      
                      {/* Paradigm name */}
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        {paradigm.paradigm}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-700 leading-relaxed">
                        {paradigm.description}
                      </p>
                      
                      {/* Progress indicator */}
                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">阶段 {index + 1}</span>
                          <div className="flex space-x-1">
                            {Array.from({ length: 4 }).map((_, dotIndex) => (
                              <div
                                key={dotIndex}
                                className={`w-2 h-2 rounded-full ${
                                  dotIndex <= index 
                                    ? `bg-gradient-to-r ${colorClass}` 
                                    : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Summary card */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-200">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-6 flex-shrink-0">
                <Brain size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  认知变革的核心意义
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  从统计模式匹配到生成式智能，每一次认知范式的转变都代表着人工智能对语言理解和生成能力的深度飞跃。
                  现代大型语言模型不仅能够理解语言的表层结构，更能够把握其深层语义，并在此基础上进行创造性的生成和推理。
                  这种认知能力的提升，标志着人工智能正在从工具属性向伙伴属性转变。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CognitiveSection
