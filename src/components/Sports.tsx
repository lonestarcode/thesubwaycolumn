import React from 'react'
import { ChevronRight } from 'lucide-react'

const sample = {
  sections: [
    {
      title: 'MLB',
      games: [
        { teams: 'Yankees 7, Red Sox 3', status: 'Final', when: 'Today' },
        { teams: 'Mets 4, Phillies 6', status: 'Final', when: 'Yesterday' },
        { teams: 'Yankees @ Orioles', status: '7:05 PM', when: 'Tonight' },
      ],
    },
    {
      title: 'NFL',
      games: [
        { teams: 'Giants 21, Browns 18', status: 'Final', when: 'Sun' },
        { teams: 'Jets 10, Broncos 24', status: 'Final', when: 'Sun' },
        { teams: 'Giants @ Eagles', status: '1:00 PM', when: 'Oct 8' },
      ],
    },
    {
      title: 'NBA',
      games: [
        { teams: 'Knicks vs Celtics', status: '7:30 PM', when: 'Oct 25' },
        { teams: 'Nets @ Raptors', status: '7:30 PM', when: 'Oct 25' },
      ],
    },
    {
      title: 'NHL',
      games: [
        { teams: 'Rangers vs Devils', status: '7:00 PM', when: 'Oct 11' },
        { teams: 'Islanders @ Hurricanes', status: '7:00 PM', when: 'Oct 10' },
      ],
    },
  ],
}

const Sports: React.FC = () => {
  return (
    <section className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 space-y-4">
        <header className="flex items-baseline justify-between">
          <h4 className="text-sm tracking-wider uppercase text-gray-500 font-semibold">Sports</h4>
          <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600" aria-label="More sports">
            More <ChevronRight className="w-3 h-3" />
          </button>
        </header>

        <div className="space-y-3">
          {sample.sections.map((section) => (
            <div key={section.title}>
              <div className="text-sm font-bold text-gray-700 mb-2">{section.title}</div>

              <div className="divide-y divide-gray-100">
                {section.games.map((g) => (
                  <div key={`${section.title}-${g.teams}`} className="py-2 flex items-start justify-between gap-3 hover:bg-gray-50 p-1 rounded">
                    <div className="text-sm text-gray-800 truncate">{g.teams}</div>
                    <div className="text-xs text-right space-y-0">
                      <div className="text-gray-500">{g.when}</div>
                      <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${g.status === 'Final' ? 'bg-gray-100 text-gray-700' : 'bg-red-50 text-red-700'}`}>
                        {g.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Sports
