import type { Story as TStory } from '../../nytimes-api'
import { StoryWrapper } from './story-wrapper'
import { StoryBody } from './story-body'
import { StoryPhoto } from './story-photo'

type Props = {
  story: TStory
  priority?: boolean
}

export const Story = ({ story, priority }: Props) => (
  <StoryWrapper>
    <div className="col-span-full lg:col-span-5">
      <StoryBody story={story} readTime />
    </div>
    <div className="row-start-1 col-span-full lg:col-span-9 lg:row-start-auto">
      <StoryPhoto story={story} caption priority={priority} />
    </div>
  </StoryWrapper>
)
