import Image from 'next/image'
import type { Story } from '../../nytimes-api'

interface Props {
  story: Story
  caption?: boolean
  priority?: boolean
}

export const StoryPhoto = ({ story, caption, priority = false }: Props) => {
  if (!story.multimedia) return null

  const image = story.multimedia.find(
    (media) => media.type === 'image' && media.format === 'Super Jumbo'
  )!

  return (
    <figure>
      <div className="flex relative">
        <Image
          src={image.url}
          alt={image.caption}
          width={image.width}
          height={image.height}
          sizes="(max-width: 660px) 640px, (max-width: 1024px) 980px, 522px"
          className="object-cover object-top"
          priority={priority}
        />
      </div>
      {caption && (
        <figcaption className="text-content-tertiary text-right text-[0.56rem] mt-1">
          <span>{image.copyright}</span>
        </figcaption>
      )}
    </figure>
  )
}
