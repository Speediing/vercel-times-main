import { notFound } from 'next/navigation'
export interface Story {
  section: string
  subsection: string
  title: string
  abstract: string
  url: string
  uri: string
  byline: string
  item_type: string
  updated_date: string
  created_date: string
  published_date: string
  material_type_facet: string
  kicker: string
  des_facet: string[]
  org_facet: string[]
  per_facet: string[]
  geo_facet: string[]
  multimedia?: {
    url: string
    format: string
    height: number
    width: number
    type: string
    subtype: string
    caption: string
    copyright: string
  }[]
  short_url: string
}

interface TopStories {
  status: string
  copyright: string
  section: string
  last_updated: string
  num_results: number
  results: Story[]
}

/**
 * Returns the top stories from the New York Times API.
 *
 * If you're getting rate limited (429) you can remove the API key and this method will use a
 * local copy of the data.
 */
export async function getNYTimesTopStories(): Promise<TopStories> {
  const apiKey = process.env.NYTIMES_API_KEY

  if (!apiKey) {
    return await import('./nytimes-data.json').then((mod) => mod.default)
  }

  // For reference and to know what sections are available:
  // https://developer.nytimes.com/docs/top-stories-product/1/routes/%7Bsection%7D.json/get
  const section = 'home'
  const url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${apiKey}`
  const res = await fetch(url, { next: { revalidate: 60 * 60 } })

  if (!res.ok) {
    throw new Error(
      `Failed to fetch NYTimes top stories. ${res.status} - ${res.statusText}`,
    )
  }

  const data = await res.json()

  // Store the data locally. Only for template purposes
  // await import('fs/promises').then((fs) =>
  //   fs.writeFile('./app/nytimes-data.json', JSON.stringify(data, null, 2)),
  // )

  return data
}

export async function getNYTimesStory(slug: string): Promise<Story> {
  const stories = await getNYTimesTopStories()
  const story = stories.results.find((story) => story.url.endsWith(slug))

  if (!story) notFound()

  return story
}
