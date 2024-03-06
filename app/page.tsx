import { Suspense } from 'react'
import { Header } from './components/header'
import { CookieBanner } from './components/cookie-banner'
import { Footer } from './components/footer'
import StoriesPage from './components/stories-page'

const Page = async () => (
  <>
    <Suspense>
      <CookieBanner />
    </Suspense>
    <div className="max-w-7xl mx-auto px-2 lg:px-10">
      <Header />
      <Suspense>
        <StoriesPage />
      </Suspense>
    </div>
    <Suspense>
      <Footer />
    </Suspense>
  </>
)

export default Page
