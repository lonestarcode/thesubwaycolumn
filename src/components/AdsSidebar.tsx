'use client'

import React from 'react'

const AdsSidebar: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Cartoon Section */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="relative w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 text-sm">Cartoon placeholder</p>
        </div>
      </div>

      {/* Ad Space */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="relative w-full h-96 bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-400 text-sm">Ad Space 300x600</p>
        </div>
      </div>
    </div>
  )
}

export default AdsSidebar