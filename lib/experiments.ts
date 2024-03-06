import { type NextRequest, NextResponse } from 'next/server'
import { pathToRegexp } from 'path-to-regexp'
import { type EdgeConfigValue, get } from '@vercel/edge-config'

const toRegex = (paths: string[]) => paths.map((path) => pathToRegexp(path))

export const article_header_redesign = 'article_header_redesign'

export type EdgeConfigExperiment = {
  active: boolean
  props: Record<string, EdgeConfigValue>
}

export type Experiment = EdgeConfigExperiment & {
  exclude: RegExp[]
  matcher: RegExp[]
  enabled: (req: NextRequest) => boolean
  handler: (req: NextRequest) => NextResponse
}

export const EXPERIMENTS = {
  [article_header_redesign]: {
    // Is the experiment active?
    active: true,
    // Props to pass to the experiment page
    props: {
      showTopHeader: true,
    },
    // Paths to exclude from the experiment
    exclude: toRegex(['/experiments/:slug+']),
    // Paths where the experiment should be applied
    matcher: toRegex([
      '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:section([^/]+)/:slug+',
      '/(interactive|live)/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:section([^/]+)/:slug+',
      '/article/:slug([^/]+)',
    ]),
    // Enables the experiment for the current user
    enabled: (_req: NextRequest) => Math.random() < 0.5,
    // If the experiment is enabled, rewrite the user to the experiment page
    handler: (req: NextRequest) => {
      req.nextUrl.pathname = `/experiments/${article_header_redesign}${req.nextUrl.pathname}`
      return NextResponse.rewrite(req.nextUrl)
    },
  },
} satisfies Record<string, Experiment>

export type Experiments = keyof typeof EXPERIMENTS

export const getExperiment = async (experiment: Experiments) => {
  if (!process.env.EDGE_CONFIG) {
    console.error(
      'Setup Edge Config for the project to use it for experiments. Falling back to default values.'
    )
    return EXPERIMENTS[experiment]
  }

  return get<EdgeConfigExperiment>(experiment)
}

export const getExperimentProps = async (experiment?: Experiments) => {
  if (!experiment) return
  const value = await getExperiment(experiment)
  return value
    ? { ...EXPERIMENTS[experiment].props, ...value.props }
    : undefined
}
