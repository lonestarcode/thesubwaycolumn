import AdSidebar from '@/components/AdSidebar'
import MainContent from '@/components/MainContent'
import LeftSidebar from '@/components/LeftSidebar'
import { getRecentArticles } from '@/lib/database'

export default async function Home() {
  const articles = await getRecentArticles(10);

  return (
    <div className="fixed inset-0 pt-16 flex">
      {/* Left Sidebar - Borough tabs and Most Read */}
      <aside className="hidden lg:block w-[300px] h-full overflow-y-auto bg-yellow-50 p-4">
        <LeftSidebar />
      </aside>

      {/* Main Content Area - Featured Image and Articles */}
      <main className="flex-1 xl:mr-[250px] h-full overflow-y-auto bg-white">
        <div id="content" className="w-full h-full">
          <MainContent articles={articles} />
        </div>
      </main>

      {/* Right Ad Sidebar */}
      <AdSidebar side="right" />
    </div>
  )
}