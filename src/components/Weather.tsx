import React from 'react'
import { CloudSun } from 'lucide-react'

const sample = {
  location: 'NYC',
  current: '72°F',
  condition: 'Partly Cloudy',
  high: '78°F',
  low: '65°F',
  updated: 'Now',
  forecast: [
    { day: 'Tomorrow', high: '75°', low: '62°', condition: 'Sunny' },
    { day: 'Fri', high: '73°', low: '61°', condition: 'Cloudy' },
    { day: 'Sat', high: '77°', low: '64°', condition: 'Rain' },
  ],
}

const Weather: React.FC = () => {
  return (
    <section className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-md text-gray-700">
              <CloudSun className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm tracking-wider uppercase text-gray-500 font-semibold">Weather</h4>
              <div className="text-3xl font-extrabold text-gray-900 mt-1">{sample.current}</div>
              <div className="text-xs text-gray-600">{sample.condition} • {sample.location}</div>
            </div>
          </div>

          <div className="text-right text-sm text-gray-600">
            <div>H: <span className="font-semibold text-red-600">{sample.high}</span></div>
            <div>L: <span className="font-semibold text-gray-700">{sample.low}</span></div>
          </div>
        </div>

        <div className="mt-4 border-t border-gray-100 pt-3">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            {sample.forecast.map((f) => (
              <div key={f.day} className="flex flex-col items-center gap-1">
                <div className="text-gray-700 font-medium">{f.day}</div>
                <div className="text-gray-500">{f.condition}</div>
                <div className="text-gray-700 font-semibold">{f.high}/{f.low}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 text-xs text-gray-400">Updated: {sample.updated}</div>
      </div>
    </section>
  )
}

export default Weather
