import React from 'react'
import { ArrowUp, Heart, Brain } from 'lucide-react'

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-slate-900 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Brain size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold">LLM发展历程</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              深入探索大型语言模型的技术演进，理解人工智能发展的内在逻辑和未来趋势。
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-6">快速导航</h3>
            <div className="space-y-3">
              {[
                { href: '#history', label: '历史脉络' },
                { href: '#breakthrough', label: '技术突破' },
                { href: '#cognitive', label: '认知变革' },
                { href: '#timeline', label: '发展里程碑' },
                { href: '#trends', label: '发展趋势' },
                { href: '#impact', label: '影响分析' }
              ].map((link) => (
                <button
                  key={link.href}
                  onClick={() => {
                    const element = document.querySelector(link.href)
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className="block text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-6">关于项目</h3>
            <div className="space-y-3 text-gray-300">
              <p>报告日期：2025-06-23</p>
              <p>技术栈：React + TypeScript + TailwindCSS</p>
              <p>设计风格：线条风格 + 清新自然</p>
              <div className="flex items-center pt-4">
                <span>用</span>
                <Heart size={16} className="text-red-400 mx-2" />
                <span>制作</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 LLM发展历程研究报告. 基于深度研究与技术分析制作.
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-full transition-colors duration-300"
          >
            <ArrowUp size={16} className="mr-2 group-hover:-translate-y-1 transition-transform duration-300" />
            <span className="text-sm font-medium">回到顶部</span>
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg className="w-full h-12" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,120 L0,120 Z" fill="rgb(16 185 129 / 0.1)"/>
          </svg>
        </div>
      </div>
    </footer>
  )
}

export default Footer
