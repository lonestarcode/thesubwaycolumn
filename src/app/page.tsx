import MainContent from '@/components/MainContent'
import RightSidebar from '@/components/RightSidebar'
import { getRecentArticles } from '@/lib/database'

export default async function Home() {
  const articles = await getRecentArticles(10);

  return (
    // Make the homepage a single-screen, non-scrollable layout. All content
    // should fit within the viewport; inner scroll containers removed.
    <div className="pt-16 h-screen overflow-hidden bg-white">
      <div className="relative h-full">
        {/* Main Content - now takes more space without left sidebar */}
        <main className="xl:mr-[320px] h-full overflow-hidden">
          <div className="fixed top-16 left-0 xl:right-[320px] right-0 h-[calc(100vh-4rem)] p-4 overflow-hidden">
            <div className="bg-white rounded h-full overflow-hidden">
              <MainContent articles={articles} />
            </div>
          </div>
        </main>

        {/* Right Sidebar - use shared RightSidebar component */}
        <aside className="hidden xl:block">
          <div className="fixed top-16 right-0 w-[320px] h-[calc(100vh-4rem)] p-4 overflow-y-auto">
            <RightSidebar />
          </div>
        </aside>
      </div>

      {/* Mobile floating CTA for subscribe (visible on small screens) */}
      <div className="fixed bottom-4 left-4 md:hidden z-40">
        <button aria-label="Subscribe" className="inline-block bg-red-600 text-white px-4 py-3 rounded-full font-semibold shadow-lg">
          Subscribe
        </button>
      </div>
    </div>
  )
}