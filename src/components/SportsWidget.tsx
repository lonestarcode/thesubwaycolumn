import React from 'react'

const weatherData = {
  current: '72°F',
  condition: 'Partly Cloudy',
  high: '78°F',
  low: '65°F',
  forecast: [
    { day: 'Tomorrow', high: '75°', low: '62°', condition: 'Sunny' },
    { day: 'Friday', high: '73°', low: '61°', condition: 'Cloudy' },
    { day: 'Saturday', high: '77°', low: '64°', condition: 'Rain' },
  ]
}

const sportsByCategory = {
  MLB: {
    games: [
      { teams: 'Yankees 7, Red Sox 3', status: 'Final', when: 'Today' },
      { teams: 'Mets 4, Phillies 6', status: 'Final', when: 'Yesterday' },
      { teams: 'Yankees @ Orioles', status: '7:05 PM', when: 'Tonight' },
    ]
  },
  NFL: {
    games: [
      { teams: 'Giants 21, Browns 18', status: 'Final', when: 'Sun' },
      { teams: 'Jets 10, Broncos 24', status: 'Final', when: 'Sun' },
      { teams: 'Giants @ Eagles', status: '1:00 PM', when: 'Oct 8' },
    ]
  },
  NBA: {
    games: [
      { teams: 'Knicks vs Celtics', status: '7:30 PM', when: 'Oct 25' },
      { teams: 'Nets @ Raptors', status: '7:30 PM', when: 'Oct 25' },
    ]
  },
  NHL: {
    games: [
      { teams: 'Rangers vs Devils', status: '7:00 PM', when: 'Oct 11' },
      { teams: 'Islanders @ Hurricanes', status: '7:00 PM', when: 'Oct 10' },
    ]
  }
}

const SportsWidget: React.FC = () => {
  return (
    <aside className="bg-white rounded-lg shadow-sm border border-gray-200 h-full overflow-hidden">
      <div className="p-4 space-y-4 h-full overflow-y-auto">
        {/* NYC Weather */}
        <div className="pb-3 border-b border-gray-200">
          <div className="mb-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xl font-bold text-gray-800">{weatherData.current}</div>
                <div className="text-xs text-gray-600">{weatherData.condition}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-600">H: {weatherData.high}</div>
                <div className="text-xs text-gray-600">L: {weatherData.low}</div>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            {weatherData.forecast.map((day) => (
              <div key={day.day} className="flex justify-between items-center text-xs">
                <span className="font-medium text-gray-700">{day.day}</span>
                <span className="text-gray-600">{day.condition}</span>
                <span className="text-gray-600">{day.high}/{day.low}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sports Scores */}
        <div className="space-y-3">
          {Object.entries(sportsByCategory).map(([sport, data]) => (
          <div key={sport}>
            <div className="text-sm font-bold text-gray-700 mb-1.5">{sport}</div>
            <div className="space-y-1.5">
              {data.games.map((game) => (
                <div key={`${sport}-${game.teams}`} className="flex justify-between items-center text-sm">
                  <span className="text-gray-800 text-xs">{game.teams}</span>
                  <div className="flex gap-2 items-center text-gray-600">
                    <span className="text-xs">{game.when}</span>
                    <span className="text-xs">{game.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        </div>
      </div>
    </aside>
  )
}

export default SportsWidget
