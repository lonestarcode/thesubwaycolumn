"use client"

import React from 'react'
import Weather from './Weather'
import Sports from './Sports'

const RightSidebar: React.FC = () => {
  return (
    <div className="space-y-6">
      <Weather />
      <Sports />
    </div>
  )
}

export default RightSidebar