import React from 'react'
import { Globe, Cpu, Users, AlertTriangle, CheckCircle, ArrowUpRight } from 'lucide-react'

interface ImpactSectionProps {
  impacts: {
    ai_field: string[]
    society: string[]
  }
}

const ImpactSection: React.FC<ImpactSectionProps> = ({ impacts }) => {
  return (
    <section id="impact" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6">
            <Globe size={32} className="text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            影响分析
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            大型语言模型对人工智能领域和整个社会产生的深远影响
          </p>
        </div>

        {/* Impact Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* AI Field Impact */}
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                <Cpu size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                对人工智能领域的影响
              </h3>
            </div>

            <div className="space-y-4">
              {impacts.ai_field.map((impact, index) => (
                <div key={index} className="flex items-start p-4 bg-blue-50 rounded-xl border border-blue-100 hover:border-blue-200 transition-colors duration-300">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-0.5">
                    <CheckCircle size={16} className="text-white" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">{impact}</p>
                </div>
              ))}
            </div>

            {/* AI Field Visual */}
            <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="flex items-center justify-center">
                <img 
                  src="/images/ai-brain.jpg" 
                  alt="AI Brain Network"
                  className="max-w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>

          {/* Society Impact */}
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                <Users size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                对社会的影响
              </h3>
            </div>

            <div className="space-y-4">
              {impacts.society.map((impact, index) => {
                const isChallenge = impact.includes('挑战') || impact.includes('问题')
                
                return (
                  <div key={index} className={`flex items-start p-4 rounded-xl border transition-colors duration-300 ${
                    isChallenge 
                      ? 'bg-orange-50 border-orange-100 hover:border-orange-200' 
                      : 'bg-emerald-50 border-emerald-100 hover:border-emerald-200'
                  }`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-0.5 ${
                      isChallenge ? 'bg-orange-500' : 'bg-emerald-500'
                    }`}>
                      {isChallenge ? (
                        <AlertTriangle size={16} className="text-white" />
                      ) : (
                        <CheckCircle size={16} className="text-white" />
                      )}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{impact}</p>
                  </div>
                )
              })}
            </div>

            {/* Society Visual */}
            <div className="mt-8 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
              <div className="flex items-center justify-center">
                <img 
                  src="/images/evolution.jpg" 
                  alt="Social Evolution"
                  className="max-w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="max-w-5xl mx-auto mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Positive Impact */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
              <div className="flex items-center mb-4">
                <ArrowUpRight size={24} className="mr-3" />
                <h4 className="text-xl font-bold">积极影响</h4>
              </div>
              <p className="text-emerald-100">
                提升生产力、促进创新、降低技术门槛，推动人工智能技术的普及和应用。
              </p>
            </div>

            {/* Challenges */}
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white">
              <div className="flex items-center mb-4">
                <AlertTriangle size={24} className="mr-3" />
                <h4 className="text-xl font-bold">面临挑战</h4>
              </div>
              <p className="text-orange-100">
                就业结构变化、伦理道德问题、技术滥用风险需要社会各界共同应对。
              </p>
            </div>

            {/* Future Outlook */}
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white">
              <div className="flex items-center mb-4">
                <Globe size={24} className="mr-3" />
                <h4 className="text-xl font-bold">未来展望</h4>
              </div>
              <p className="text-purple-100">
                在技术进步与社会责任之间寻求平衡，实现AI技术的可持续发展。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImpactSection
