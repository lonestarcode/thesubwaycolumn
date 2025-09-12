import RightSidebar from '@/components/RightSidebar'
import Image from 'next/image'
import { getRecentArticles } from '@/lib/database'

export default async function Home() {
  const articles = await getRecentArticles(10);

  return (
    <div className="fixed inset-0 pt-16 flex">
      {/* Left Sidebar - Hidden for now */}
      {/* <LeftSidebar /> */}

      {/* Main Content - Magazine Cover */}
      <main className="flex-1 lg:mr-[30%] h-full overflow-hidden flex items-center justify-center">
        <div id="content" className="w-full h-full flex items-center justify-center p-4">
          <div className="relative w-full h-full max-w-[800px]">
            <Image 
              src="/cover.jpg"
              alt="Magazine Cover" 
              fill
              className="object-contain"
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