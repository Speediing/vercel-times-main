import { Paywall } from 'app/components/paywall'
import { ArticlePage } from 'app/components/article/article-page'

export { generateStaticParams } from 'app/[...slug]/page'

const Page = (props: any) => (
  <Paywall>
    <ArticlePage {...props} paywall />
  </Paywall>
)

export default Page
