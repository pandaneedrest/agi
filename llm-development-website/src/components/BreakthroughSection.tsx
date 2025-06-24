import React, { useState } from 'react'
import { Zap, Eye, Bot, Settings, Award, Target } from 'lucide-react'

interface BreakthroughSectionProps {
  data: {
    title: string
    content: string
    subsections: Array<{
      title: string
      content?: string
      components?: string[]
      models?: Array<{
        name: string
        type: string
        approach: string
        strength: string
        paradigm: string
      }>
      techniques?: Array<{
        name: string
        description: string
      }>
    }>
  }
}

const BreakthroughSection: React.FC<BreakthroughSectionProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="breakthrough" className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-6">
            <Zap size={32} className="text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {data.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {data.content}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-12">
          {data.subsections.map((subsection, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 mx-2 my-1 rounded-full font-medium transition-all duration-300 ${
                activeTab === index
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200'
              }`}
            >
              {subsection.title}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto">
          {data.subsections.map((subsection, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                activeTab === index ? 'opacity-100 visible' : 'opacity-0 invisible absolute'
              }`}
            >
              {/* Transformer Architecture */}
              {index === 0 && subsection.components && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {subsection.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {subsection.content}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {subsection.components.map((component, componentIndex) => {
                        const icons = [Eye, Settings, Target, Zap]
                        const Icon = icons[componentIndex % icons.length]
                        
                        return (
                          <div key={componentIndex} className="flex items-center p-4 bg-white rounded-xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center mr-3">
                              <Icon size={18} className="text-emerald-600" />
                            </div>
                            <span className="font-medium text-gray-800">{component}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <img 
                      src="/images/transformer.png" 
                      alt="Transformer Architecture"
                      className="max-w-full h-auto rounded-xl shadow-lg"
                    />
                  </div>
                </div>
              )}

              {/* BERT vs GPT */}
              {index === 1 && subsection.models && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                    {subsection.title}
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {subsection.models.map((model, modelIndex) => (
                      <div key={modelIndex} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center mb-6">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                            model.name === 'BERT' 
                              ? 'bg-gradient-to-br from-blue-500 to-indigo-600' 
                              : 'bg-gradient-to-br from-emerald-500 to-teal-600'
                          }`}>
                            <span className="text-white font-bold text-lg">{model.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-gray-900">{model.name}</h4>
                            <p className="text-gray-600">{model.type}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <span className="text-sm font-medium text-gray-500">处理方式</span>
                            <p className="text-gray-800 font-medium">{model.approach}</p>
                          </div>
                          
                          <div>
                            <span className="text-sm font-medium text-gray-500">擅长领域</span>
                            <p className="text-gray-800 font-medium">{model.strength}</p>
                          </div>
                          
                          <div className="pt-4 border-t border-gray-100">
                            <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full">
                              <Award size={14} className="mr-2 text-gray-600" />
                              <span className="text-sm font-medium text-gray-700">{model.paradigm}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SFT & RLHF */}
              {index === 2 && subsection.techniques && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                    {subsection.title}
                  </h3>
                  
                  <div className="space-y-8">
                    {subsection.techniques.map((technique, techniqueIndex) => (
                      <div key={techniqueIndex} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                        <div className="flex items-start">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-6 flex-shrink-0">
                            <Bot size={24} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-900 mb-3">{technique.name}</h4>
                            <p className="text-gray-700 leading-relaxed">{technique.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BreakthroughSection
