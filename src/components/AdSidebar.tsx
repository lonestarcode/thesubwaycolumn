'use client'

interface AdSidebarProps {
  side: 'left' | 'right'
}

const AdSidebar = ({ side }: AdSidebarProps) => {
  // Sample ad placements - replace with actual ad service integration
  const ads = [
    {
      id: 1,
      title: 'NYC Real Estate',
      bgColor: 'bg-red-400',
      textColor: 'text-white',
      label: 'Ad Space 1',
      link: '#'
    },
    {
      id: 2,
      title: 'Local Services',
      bgColor: 'bg-teal-400',
      textColor: 'text-white',
      label: 'Ad Space 2',
      link: '#'
    },
    {
      id: 3,
      title: 'Events & Entertainment',
      bgColor: 'bg-yellow-400',
      textColor: 'text-gray-800',
      label: 'Ad Space 3',
      link: '#'
    },
    {
      id: 4,
      title: 'Restaurants & Dining',
      bgColor: 'bg-green-300',
      textColor: 'text-gray-800',
      label: 'Ad Space 4',
      link: '#'
    }
  ]

  return (
    <aside className={`hidden xl:block fixed top-16 ${side === 'left' ? 'left-0' : 'right-0'} w-[250px] h-[calc(100vh-4rem)] overflow-y-auto bg-gray-100 p-4`}>
      <div className="space-y-6">
        {/* Ad Header */}
        <div className="text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Advertisement</p>
        </div>

        {/* Ad Slots */}
        {ads.map((ad) => (
          <div key={ad.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <a href={ad.link} target="_blank" rel="noopener noreferrer" className="block">
              <div className={`relative w-full h-[250px] ${ad.bgColor} flex items-center justify-center`}>
                <div className={`text-center ${ad.textColor}`}>
                  <p className="text-2xl font-bold mb-2">{ad.label}</p>
                  <p className="text-sm">300x250</p>
                </div>
              </div>
              <div className="p-2 bg-gray-50">
                <p className="text-xs text-gray-600 text-center">{ad.title}</p>
              </div>
            </a>
          </div>
        ))}

        {/* Additional Ad Space */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-sm text-gray-600 text-center mb-2">Your Ad Here</p>
          <p className="text-xs text-gray-500 text-center">Contact advertising@nycmag.com</p>
        </div>
      </div>
    </aside>
  )
}

export default AdSidebar