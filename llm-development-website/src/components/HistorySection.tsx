import React from 'react'
import { BarChart3, Network, TrendingUp } from 'lucide-react'

interface HistorySectionProps {
  data: {
    title: string
    content: string
    subsections: Array<{
      title: string
      content: string
      features: string[]
      paradigm: string
    }>
  }
}

const HistorySection: React.FC<HistorySectionProps> = ({ data }) => {
  const icons = [BarChart3, Network]
  
  return (
    <section id="history" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {data.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {data.content}
          </p>
        </div>

        {/* Timeline visualization */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-emerald-300 to-teal-500 rounded-full"></div>

          {/* Subsections */}
          <div className="space-y-16">
            {data.subsections.map((subsection, index) => {
              const Icon = icons[index]
              const isEven = index % 2 === 0

              return (
                <div key={index} className={`relative flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Timeline node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white border-4 border-emerald-500 rounded-full flex items-center justify-center z-10">
                    <Icon size={20} className="text-emerald-600" />
                  </div>

                  {/* Content card */}
                  <div className={`w-full lg:w-5/12 ${isEven ? 'lg:pr-16' : 'lg:pl-16'}`}>
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-emerald-100">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {subsection.title}
                      </h3>
                      
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {subsection.content}
                      </p>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-800 mb-3">主要特点：</h4>
                        <ul className="space-y-2">
                          {subsection.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Paradigm badge */}
                      <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-medium rounded-full">
                        <TrendingUp size={16} className="mr-2" />
                        {subsection.paradigm}
                      </div>
                    </div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden lg:block w-5/12"></div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HistorySection
