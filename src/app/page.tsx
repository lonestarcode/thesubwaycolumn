import LeftSidebar from '@/components/LeftSidebar'
import RightSidebar from '@/components/RightSidebar'
import Image from 'next/image'
import { getRecentArticles } from '@/lib/database'

export default async function Home() {
  const articles = await getRecentArticles(10);

  return (
    <div className="pt-16 flex flex-col lg:flex-row max-w-[1920px] mx-auto relative">
      {/* Left Sidebar */}
      <LeftSidebar />

      {/* Main Content - Magazine Cover */}
      <main className="lg:pl-[25%] lg:pr-[22%] w-full">
        <div id="content" className="max-w-[1200px]">
          <div className="w-full relative cursor-pointer hover:opacity-95 transition-opacity" style={{ height: 'calc(100vh - 4rem)' }}>
            <Image 
              src="/cover.jpg"
              alt="Magazine Cover" 
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </main>

      {/* Right Sidebar - Opinion Column */}
      <RightSidebar articles={articles} />
    </div>
  )
}