'use client'

import Link from 'next/link'
import Image from 'next/image'

const LeftSidebar = () => {
  const boroughs = [
    { name: 'Manhattan', href: '/boroughs/manhattan' },
    { name: 'Brooklyn', href: '/boroughs/brooklyn' },
    { name: 'Queens', href: '/boroughs/queens' },
    { name: 'Bronx', href: '/boroughs/bronx' },
    { name: 'Staten Island', href: '/boroughs/staten-island' },
  ]

  return (
    <div className="w-full bg-gray-300 p-6 flex flex-col rounded-lg"
         style={{
           borderTop: '3px solid #ffffff',
           borderLeft: '3px solid #ffffff',
           borderRight: '3px solid #808080',
           borderBottom: '3px solid #808080',
           boxShadow: 'inset -1px -1px #404040'
         }}>
      
      <div className="flex flex-col space-y-10 bg-gray-300 p-2"
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
                      className="flex justify-between items-center py-2 px-3 bg-gray-300 rounded 
                                 border border-gray-600 hover:bg-gray-350 font-bold">
                  {borough.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Articles */}
        <div>
          <h3 className="text-sm font-bold text-gray-700 mb-3">Most Read:</h3>
          <div className="space-y-3">
            {[
              {
                title: 'Williamsburg\'s New Bagel Wars Heat Up',
                date: 'October 2, 2024',
                borough: 'Brooklyn',
                image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400'
              },
              {
                title: 'SoHo Landlords Fight Back Against Peddlers',
                date: 'October 5, 2024',
                borough: 'Manhattan',
                image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=400'
              },
              {
                title: 'East Harlem Rent Strike Enters Week Three',
                date: 'October 3, 2024',
                borough: 'Manhattan',
                image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400'
              },
              {
                title: 'Astoria Food Hall Draws Criticism',
                date: 'October 6, 2024',
                borough: 'Queens',
                image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400'
              },
              {
                title: 'St. George Terminal Gets $40M Facelift',
                date: 'October 7, 2024',
                borough: 'Staten Island',
                image: 'https://images.unsplash.com/photo-1585558265020-1dc5db043da0?w=400'
              }
            ].slice(0, 5).map((article, index) => (
              <article key={index} className="bg-white rounded shadow hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex p-3">
                  <div className="flex-1 pr-3">
                    <h3 className="text-sm font-bold text-blue-900 line-clamp-2 leading-tight mb-1">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">
                      {article.date}
                    </p>
                  </div>
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image 
                      src={article.image} 
                      alt={article.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftSidebar