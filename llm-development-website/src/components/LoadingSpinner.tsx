import React from 'react'

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-200 border-t-emerald-600 mb-4"></div>
        <h2 className="text-xl font-medium text-gray-700">加载中...</h2>
        <p className="text-gray-500 mt-2">正在获取LLM发展数据</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
