import { getNYTimesTopStories, Story as TStory } from '../nytimes-api'
import { Story, StoryBody, StoryGroup, StoryPhoto } from './story'
import { Opinion } from './opinion'

export default async function StoriesPage() {
  const stories = await getNYTimesTopStories()
  const articles: TStory[] = []
  const opinionStories: TStory[] = []
  let interactiveStory: TStory | null = null

  for (const story of stories.results) {
    if (story.section === 'opinion') {
      opinionStories.push(story)
    } else if (story.item_type === 'Interactive' && !interactiveStory) {
      // The first interactive story that's found will be the top right story
      interactiveStory = story
    }
    // We don't handle stories without multimedia
    else if (story.multimedia) {
      articles.push(story)
    }
  }

  const topArticles = articles.slice(0, 3)
  const otherArticles = articles.slice(3, articles.length - 2)
  const lastArticles = articles.slice(articles.length - 2)

  return (
    <main>
      <div className="grid grid-cols-3 gap-6 lg:divide-x divide-gray-400">
        <div className="col-span-full lg:col-span-2">
          <StoryGroup stories={topArticles} />

          {otherArticles.map((story, i) => (
            <Story key={story.uri} story={story} priority={i === 0} />
          ))}
        </div>
        <div className="col-span-full lg:col-span-1 lg:pl-6">
          <div className="border-t border-neutral-900">
            {interactiveStory && (
              <section className="pt-4 grid gap-2 pb-4">
                <StoryPhoto story={interactiveStory} caption />
                <StoryBody
                  story={interactiveStory}
                  variant="right-headline"
                  readTime
                />
              </section>
            )}
            <div className="grid grid-cols-6 gap-x-4 py-4 border-t border-neutral-200">
              {lastArticles.map((story) => (
                <section
                  key={story.uri}
                  className="col-span-3 grid gap-2 content-start"
                >
                  <StoryPhoto story={story} />
                  <StoryBody story={story} variant="secondary" readTime />
                </section>
              ))}
            </div>
          </div>
          <section className="border-t border-neutral-900 pt-2">
            <div className="text-sm font-bold mb-4">
              <span>Opinion</span>
            </div>
            <div className="divide-y divide-slate-200">
              {opinionStories.map((story) => (
                <Opinion key={story.uri} story={story} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
