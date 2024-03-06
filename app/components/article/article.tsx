import Link from 'next/link'
import Image from 'next/image'
import { getNYTimesStory } from 'app/nytimes-api'
import { TLogo } from '../tlogo'
import { type Experiments, getExperimentProps } from 'lib/experiments'

type Props = {
  experiment?: Experiments
  slug: string[]
  paywall?: boolean
}

export const Article = async ({ experiment, slug, paywall }: Props) => {
  const [story, experimentData] = await Promise.all([
    getNYTimesStory(slug.join('/')),
    getExperimentProps(experiment),
  ])
  const image = story.multimedia?.find(
    (media) => media.type === 'image' && media.format === 'Super Jumbo'
  )

  return (
    <article className="pt-[42px]">
      {experimentData?.showTopHeader && (
        <div className="flex sm:justify-center items-center min-h-[55px] relative border-b border-stroke-quaternary overflow-y-hidden overflow-x-auto">
          <span className="hidden xl:flex absolute left-0 h-[55px] items-center px-2.5">
            <span className="p-2.5">
              <Link href="/">
                <TLogo />
              </Link>
            </span>
          </span>
          <nav className="flex min-w-[620px] pl-5 whitespace-nowrap">
            <h3 className="text-[0.9375rem] leading-[0.9375rem] font-bold flex items-center">
              <span className="mr-4 pr-4 border-r border-stroke-quaternary">
                Lorem Ipsum
              </span>
            </h3>
            <ul className="flex text-sm font-medium">
              {[
                'What We Know',
                'Explaining What Happened',
                'Fact-Check',
                'The Investigation',
                "What's Next",
              ].map((item) => (
                <li key={item} className="py-[1em] mr-[1.4em]">
                  <Link href="/">{item}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 lg:px-10">
        <header className="max-w-[600px] mx-auto mt-4 lg:mt-[3.75rem] mb-5 flex flex-col">
          <h1 className="font-bold text-4xl font-serif italic leading-[2.875rem] mb-2">
            {story.title}
          </h1>
          <p className="text-[1.3rem] leading-[1.875rem] font-serif font-light text-[#363636] mb-[1.875rem]">
            {story.abstract}
          </p>
          <div
            role="toolbar"
            aria-label="Social Media Share buttons, Save button, and Comments Panel with current comment count"
            className="border-t border-[#ebebeb] pt-5"
          >
            <ul className="flex">
              <li className="mr-3">
                <button
                  type="button"
                  className="rounded-[30px] border border-[#dfdfdf] text-xs font-medium flex items-center py-1.5 px-2.5"
                >
                  <svg
                    className="mr-[5px]"
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                  >
                    <path
                      d="M18.04 5.293h-2.725c.286-.34.493-.74.606-1.17a2.875 2.875 0 0 0-.333-2.322A2.906 2.906 0 0 0 13.64.48a3.31 3.31 0 0 0-2.372.464 3.775 3.775 0 0 0-1.534 2.483l-.141.797-.142-.847A3.745 3.745 0 0 0 7.927.923 3.31 3.31 0 0 0 5.555.459 2.907 2.907 0 0 0 3.607 1.78a2.877 2.877 0 0 0-.333 2.321c.117.429.324.828.606 1.171H1.155a.767.767 0 0 0-.757.757v3.674a.767.767 0 0 0 .757.757h.424v7.53A1.01 1.01 0 0 0 2.588 19h14.13a1.01 1.01 0 0 0 1.01-.959v-7.56h.424a.758.758 0 0 0 .757-.757V6.05a.759.759 0 0 0-.868-.757Zm-7.196-1.625a2.665 2.665 0 0 1 1.01-1.736 2.24 2.24 0 0 1 1.574-.313 1.817 1.817 0 0 1 1.211.818 1.857 1.857 0 0 1 .202 1.453 2.2 2.2 0 0 1-.838 1.191h-3.431l.272-1.413ZM4.576 2.386a1.837 1.837 0 0 1 1.221-.817 2.23 2.23 0 0 1 1.565.313 2.624 2.624 0 0 1 1.01 1.736l.242 1.453H5.182a2.2 2.2 0 0 1-.838-1.19 1.857 1.857 0 0 1 .202-1.495h.03ZM1.548 6.424h7.54V9.39h-7.58l.04-2.967Zm1.181 4.128h6.359v7.287H2.729v-7.287Zm13.777 7.287h-6.348v-7.307h6.348v7.307Zm1.181-8.468h-7.53V6.404h7.53V9.37Z"
                      fill="#121212"
                      fillRule="nonzero"
                    ></path>
                  </svg>
                  <span>Give this article</span>
                </button>
              </li>
              <li className="mr-3">
                <button
                  type="button"
                  className="rounded-[30px] border border-[#dfdfdf] p-1.5"
                >
                  <svg width="20" height="19" viewBox="0 0 23 18">
                    <path
                      d="M1.357 17.192a.663.663 0 0 1-.642-.81c1.82-7.955 6.197-12.068 12.331-11.68V1.127a.779.779 0 0 1 .42-.653.726.726 0 0 1 .78.106l8.195 6.986a.81.81 0 0 1 .253.557.82.82 0 0 1-.263.547l-8.196 6.955a.83.83 0 0 1-.779.105.747.747 0 0 1-.42-.663V11.29c-8.418-.905-10.974 5.177-11.08 5.45a.662.662 0 0 1-.6.453Zm10.048-7.26a16.37 16.37 0 0 1 2.314.158.81.81 0 0 1 .642.726v3.02l6.702-5.682-6.702-5.692v2.883a.767.767 0 0 1-.242.536.747.747 0 0 1-.547.18c-4.808-.537-8.364 1.85-10.448 6.922a11.679 11.679 0 0 1 8.28-3.093v.042Z"
                      fill="#000"
                      fillRule="nonzero"
                    ></path>
                  </svg>
                </button>
              </li>
              <li className="mr-3">
                <button
                  type="button"
                  className="rounded-[30px] border border-[#dfdfdf] p-[8px]"
                >
                  <svg width="15" height="15" viewBox="0 0 12 18">
                    <g fillRule="nonzero" stroke="#666" fill="none">
                      <path
                        fill="none"
                        d="M1.157 1.268v14.288l4.96-3.813 4.753 3.843V1.268z"
                      ></path>
                      <path
                        d="m12 18-5.9-4.756L0 17.98V1.014C0 .745.095.487.265.297.435.107.664 0 .904 0h10.192c.24 0 .47.107.64.297.169.19.264.448.264.717V18ZM1.157 1.268v14.288l4.96-3.813 4.753 3.843V1.268H1.158Z"
                        fill="#121212"
                      ></path>
                    </g>
                  </svg>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="rounded-[30px] border border-[#dfdfdf] text-xs font-medium flex items-center pt-[7px] pb-1.5 px-2.5"
                >
                  <svg
                    className="mr-[5px]"
                    width="21"
                    height="18"
                    viewBox="0 0 21 18"
                  >
                    <path
                      d="m14.52 17.831-5.715-4.545H2.4a1.468 1.468 0 0 1-1.468-1.469V1.894A1.471 1.471 0 0 1 2.4.405h16.583a1.469 1.469 0 0 1 1.469 1.469v9.923a1.469 1.469 0 0 1-1.47 1.47H14.58l-.06 4.564ZM2.4 1.645a.228.228 0 0 0-.228.229v9.923a.228.228 0 0 0 .228.229h6.811l4.06 3.235v-3.235h5.652a.228.228 0 0 0 .229-.229V1.874a.228.228 0 0 0-.229-.229H2.4Z"
                      fill="#121212"
                      fillRule="nonzero"
                    ></path>
                  </svg>
                  <span>98</span>
                </button>
              </li>
            </ul>
          </div>
          {image && (
            <figure className="mt-6 relative self-center">
              <div className="max-w-[945px] relative -mx-10 lg:-mx-40">
                <Image
                  src={image.url}
                  alt={image.caption}
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 1024px) 680px, 945px"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <figcaption className="mt-2.5 mr-5 max-max-w-[720px] font-serif text-[#727272]">
                <span className="text-[0.9375rem] leading-5 mr-[7px]">
                  {image.caption}
                </span>
                <span className="text-[0.8125rem]">{image.copyright}</span>
              </figcaption>
            </figure>
          )}
        </header>
        {paywall ? null : (
          <section className="max-w-[600px] mx-auto font-serif text-xl">
            <p className="mb-[0.9375rem]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id
              enim id neque ultrices luctus. Nam vitae ultrices orci. Maecenas
              consectetur elit at ante pulvinar bibendum. Quisque pharetra justo
              eget nulla suscipit, vel semper velit fermentum. Sed scelerisque
              tellus ut consequat euismod. Curabitur ullamcorper lacinia dolor,
              eu scelerisque elit dictum sit amet.
            </p>
            <p className="mb-[0.9375rem]">
              In aliquam leo et ante malesuada, quis commodo nibh euismod.
              Praesent et lorem a enim consequat feugiat ac id justo. Sed
              commodo dui vitae eros viverra commodo. Fusce blandit mollis
              mauris, quis commodo sem laoreet ut. Pellentesque habitant morbi
              tristique senectus et netus et malesuada fames ac turpis egestas.
              Suspendisse ac lacinia metus. Duis at lectus nec metus molestie
              dignissim. Nam euismod enim in purus convallis, a facilisis nisl
              rutrum.
            </p>
            <p className="mb-[0.9375rem]">
              Sed luctus libero vel purus bibendum, vitae eleifend elit
              placerat. Vivamus pharetra ligula in massa vehicula, at hendrerit
              ex viverra. Proin posuere urna nec dolor vulputate, sit amet
              vestibulum sapien commodo. Sed semper eu velit non tempus.
              Suspendisse finibus massa in erat tempor eleifend. Sed eu lacinia
              mauris, eget efficitur velit. Nullam eu purus vitae mi tempor
              dictum.
            </p>
            <p className="mb-[0.9375rem]">
              Fusce nec mauris in justo consequat consequat eu quis lectus. Sed
              malesuada congue ex id sagittis. Integer convallis nibh in sem
              luctus malesuada. Fusce malesuada libero id augue molestie
              aliquet. Vestibulum ante ipsum primis in faucibus orci luctus et
              ultrices posuere cubilia Curae; Donec nec nulla in enim feugiat
              tincidunt. Nulla facilisi. Phasellus eu felis eu quam congue
              auctor eget a dui. Sed vel lorem eu ante dapibus tristique.
            </p>
            <p className="mb-[0.9375rem]">
              Aliquam vitae velit eget nulla feugiat ullamcorper vel eu mi.
              Donec condimentum enim in lacus convallis efficitur. In hac
              habitasse platea dictumst. Nulla facilisi. Fusce hendrerit justo
              dolor, sed rhoncus ante fringilla eu. Ut rutrum faucibus velit, at
              vulputate nibh commodo quis. Vestibulum vitae tellus in massa
              dictum congue non non tellus. Nam auctor ligula at dolor malesuada
              malesuada.
            </p>
            <p className="mb-[0.9375rem]">
              Sed vel dui ut metus bibendum vestibulum. Nunc non ultricies
              dolor. Nulla facilisi. Etiam vel enim ut lectus hendrerit
              lobortis. Sed vel elit sit amet quam ullamcorper suscipit.
              Pellentesque et risus eu massa volutpat bibendum vel vel libero.
              Nulla facilisi. Integer tempor aliquet ante, eu bibendum arcu
              lobortis nec.
            </p>
            <p className="mb-[0.9375rem]">
              Morbi eu justo dignissim, luctus quam eget, consectetur lectus.
              Duis sed metus risus. Integer mattis felis et tincidunt eleifend.
              Suspendisse blandit velit mauris, ut dictum mauris ultrices sit
              amet. Duis interdum tincidunt lectus, ut aliquam enim mollis eu.
              Nam auctor scelerisque tortor, vitae vulputate lacus euismod id.
            </p>
          </section>
        )}
      </div>
    </article>
  )
}
