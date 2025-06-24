import React, { useState } from 'react'
import { Calendar, Star, ArrowUp, ChevronRight } from 'lucide-react'

interface TimelineProps {
  milestones: Array<{
    year: string
    event: string
    significance: string
  }>
}

const Timeline: React.FC<TimelineProps> = ({ milestones }) => {
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null)

  const getYearColor = (index: number) => {
    const colors = [
      'from-red-500 to-pink-600',
      'from-orange-500 to-yellow-600',
      'from-emerald-500 to-teal-600',
      'from-blue-500 to-indigo-600',
      'from-purple-500 to-violet-600',
      'from-pink-500 to-rose-600',
      'from-cyan-500 to-blue-600'
    ]
    return colors[index % colors.length]
  }

  return (
    <section id="timeline" className="py-20 bg-gradient-to-br from-slate-900 to-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-6">
            <Calendar size={32} className="text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            发展里程碑
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            见证大型语言模型发展历程中的关键时刻
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-teal-500/10 rounded-full blur-xl"></div>
          </div>

          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-600 transform md:-translate-x-1/2"></div>

          {/* Milestones */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0
              const isSelected = selectedMilestone === index

              return (
                <div
                  key={index}
                  className={`relative flex items-center cursor-pointer ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  onClick={() => setSelectedMilestone(isSelected ? null : index)}
                >
                  {/* Timeline node */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-10">
                    <div className={`w-16 h-16 rounded-full border-4 border-gray-900 flex items-center justify-center bg-gradient-to-br ${getYearColor(index)} shadow-lg transition-transform duration-300 ${
                      isSelected ? 'scale-125' : 'hover:scale-110'
                    }`}>
                      <Star size={20} className="text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`w-full md:w-5/12 ml-24 md:ml-0 ${
                    isEven ? 'md:pr-16' : 'md:pl-16'
                  }`}>
                    <div className={`bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-all duration-300 ${
                      isSelected ? 'ring-2 ring-emerald-500/50 shadow-2xl' : 'hover:shadow-xl'
                    }`}>
                      {/* Year badge */}
                      <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold text-white mb-4 bg-gradient-to-r ${getYearColor(index)}`}>
                        <Calendar size={16} className="mr-2" />
                        {milestone.year}
                      </div>

                      {/* Event */}
                      <h3 className="text-lg font-bold text-white mb-3 leading-tight">
                        {milestone.event}
                      </h3>

                      {/* Significance */}
                      <div className="flex items-center text-emerald-400 font-medium">
                        <ArrowUp size={16} className="mr-2" />
                        <span>{milestone.significance}</span>
                      </div>

                      {/* Expand indicator */}
                      <div className="flex items-center justify-end mt-4">
                        <ChevronRight 
                          size={20} 
                          className={`text-gray-400 transition-transform duration-300 ${
                            isSelected ? 'rotate-90' : ''
                          }`} 
                        />
                      </div>

                      {/* Extended content */}
                      {isSelected && (
                        <div className="mt-6 pt-6 border-t border-gray-700 animate-in slide-in-from-top duration-300">
                          <p className="text-gray-300 leading-relaxed">
                            这一里程碑事件标志着人工智能领域的重要突破，为后续技术发展奠定了坚实基础。
                            每一次突破都推动着我们对语言理解和生成能力的认知边界向前拓展。
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Timeline
