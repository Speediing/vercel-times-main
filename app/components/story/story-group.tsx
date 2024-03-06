import type { Story } from '../../nytimes-api'
import { StoryBody } from './story-body'
import { StoryWrapper } from './story-wrapper'
import { StoryPhoto } from './story-photo'

export const StoryGroup = ({ stories }: { stories: Story[] }) => {
  return (
    <StoryWrapper>
      <div className="col-span-full lg:col-span-5 grid auto-rows-min gap-4 divide-neutral-200 divide-y">
        {stories.map((story, i) => (
          <StoryBody
            key={story.uri}
            story={story}
            live={i === 0}
            variant={i === 0 ? 'headline' : 'secondary'}
            headline={i === 0}
            className={i !== 0 ? 'pt-4' : ''}
            readTime={i === 1}
          />
        ))}
      </div>
      <div className="row-start-1 lg:row-start-auto col-span-full lg:col-span-9">
        <StoryPhoto story={stories[0]} caption priority />
      </div>
    </StoryWrapper>
  )
}
