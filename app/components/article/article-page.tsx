import { Suspense } from 'react'
import type { Experiments } from 'lib/experiments'
import { CookieBanner } from '../cookie-banner'
import { Footer } from '../footer'
import { ArticleCreativeWork } from './article-creative-work'
import { Article } from './article'
import { ArticleHeader } from './article-header'

type Props = {
  params: { experiment?: Experiments; slug: string[] }
  paywall?: boolean
}

// We use `any` here as the type to avoid a build error
export const ArticlePage: any = ({ params, paywall }: Props) => (
  <>
    <Suspense>
      <ArticleCreativeWork slug={params.slug} />
      <CookieBanner />
    </Suspense>

    <ArticleHeader />

    <Suspense>
      <Article
        slug={params.slug}
        experiment={params.experiment}
        paywall={paywall}
      />
    </Suspense>

    <Suspense>
      <Footer />
    </Suspense>
  </>
)
