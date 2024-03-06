import { WithContext, NewsArticle } from 'schema-dts'
import { getNYTimesStory } from 'app/nytimes-api'

const vercelTimesURL = 'https://www.verceltimes.com'

export const ArticleCreativeWork = async ({ slug }: { slug: string[] }) => {
  const story = await getNYTimesStory(slug.join('/'))
  const image = story.multimedia?.find(
    (media) =>
      (media.type === 'image' && media.format === 'superJumbo') ||
      media.format === 'threeByTwoSmallAt2X'
  )
  const jsonLd: WithContext<NewsArticle> = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    // The nytimes API doesn't provide author information
    // author: [
    //   { '@type': 'Person', name: 'John Doe' },
    // ],
    dateCreated: new Date(story.created_date).toISOString(),
    dateModified: new Date(story.updated_date).toISOString(),
    datePublished: new Date(story.published_date).toISOString(),
    description: story.abstract,
    headline: story.title,
    image: image && [image.url],
    mainEntityOfPage: `${vercelTimesURL}/${new URL(story.url).pathname}`,
    publisher: {
      '@type': 'Organization',
      name: 'Vercel Times',
      url: vercelTimesURL,
      logo: {
        '@type': 'ImageObject',
        url: `${vercelTimesURL}/logo.png`,
        width: '195 px',
        height: '26 px',
      },
    },
    isAccessibleForFree: 'False',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
