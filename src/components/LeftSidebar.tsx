'use client'

import Link from 'next/link'

const LeftSidebar = ({ compact = false, onNavigate }: { compact?: boolean, onNavigate?: () => void }) => {
  const boroughs = [
    { name: 'Manhattan', href: '/boroughs/manhattan' },
    { name: 'Brooklyn', href: '/boroughs/brooklyn' },
    { name: 'Queens', href: '/boroughs/queens' },
    { name: 'Bronx', href: '/boroughs/bronx' },
    { name: 'Staten Island', href: '/boroughs/staten-island' },
  ]

  // sports and weather moved to right column

  const outerPadding = compact ? 'p-2' : 'p-6'

  // On non-compact (desktop) mode we want the left sidebar to span the
  // full viewport height so it visually stretches the length of the page.
  // Keep the compact mode unchanged for the mobile dropdown.
  const outerHeightClass = compact ? '' : 'min-h-screen'

  return (
    <div className={`w-full bg-gray-300 ${outerPadding} flex flex-col rounded-lg ${outerHeightClass}`} 
         style={{
           borderTop: '3px solid #ffffff',
           borderLeft: '3px solid #ffffff',
           borderRight: '3px solid #808080',
           borderBottom: '3px solid #808080',
           boxShadow: 'inset -1px -1px #404040'
         }}>

      <div className="flex flex-col flex-1 space-y-10 bg-gray-300 p-2"
           style={{
             borderTop: '1px solid #808080',
             borderLeft: '1px solid #808080',
             borderRight: '1px solid #ffffff',
             borderBottom: '1px solid #ffffff'
           }}>

        {/* Community Forums */}
        <div>
          <ul className="space-y-2">
            {boroughs.map((borough) => (
              <li key={borough.href} className="relative">
                <Link href={borough.href}
                      onClick={() => onNavigate?.()}
                      className="flex justify-between items-center py-2 px-3 bg-gray-300 rounded
                                 border border-gray-600 hover:bg-gray-350 font-bold">
                  {borough.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* sports and weather moved to right column */}
      </div>
    </div>
  )
}

export default LeftSidebar