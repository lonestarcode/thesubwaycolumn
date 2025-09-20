import MainContent from '@/components/MainContent'
import AdsSidebar from '@/components/AdsSidebar'
import { getRecentArticles } from '@/lib/database'

export default async function Home() {
  const articles = await getRecentArticles(10);

  return (
    // Make the homepage a single-screen, non-scrollable layout. All content
    // should fit within the viewport; inner scroll containers removed.
    <div className="pt-16 h-screen overflow-hidden bg-white">
      <div className="relative h-full max-w-7xl mx-auto">
        <div className="flex h-full gap-4 p-4">
          {/* Main Content - narrower width */}
          <main className="flex-1 h-full overflow-hidden">
            <div className="bg-white rounded h-full overflow-hidden">
              <MainContent articles={articles} />
            </div>
          </main>

          {/* Right Sidebar - Ads and Cartoons */}
          <aside className="hidden lg:block w-80 h-full overflow-y-auto">
            <AdsSidebar />
          </aside>
        </div>
      </div>
    </div>
  )
}