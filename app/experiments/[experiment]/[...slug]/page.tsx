import { getNYTimesTopStories } from 'app/nytimes-api'
import { ArticlePage } from 'app/components/article/article-page'
import { article_header_redesign } from 'lib/experiments'

export async function generateStaticParams() {
  const stories = await getNYTimesTopStories()
  const routes = []

  for (const story of stories.results) {
    const url = new URL(story.url)
    routes.push({
      experiment: article_header_redesign,
      slug: url.pathname.split('/').slice(1),
    })
  }

  return routes
}

export default ArticlePage
