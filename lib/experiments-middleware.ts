import { type NextRequest, NextResponse } from 'next/server'
import { Experiments, EXPERIMENTS, getExperiment } from './experiments'

export const getExperimentsCookie = (
  req: NextRequest
): Record<string, number> => {
  const experimentsCookie = req.cookies.get('experiments')
  return experimentsCookie ? JSON.parse(experimentsCookie.value) : {}
}

export const setExperimentsCookie = (
  res: NextResponse,
  experiments: Record<string, number>
) => {
  res.cookies.set('experiments', JSON.stringify(experiments))
}

export const applyExperiments = async (
  req: NextRequest,
  res: NextResponse = NextResponse.next()
): Promise<NextResponse> => {
  const url = req.nextUrl
  const experiments = getExperimentsCookie(req)
  let changeCookie = false

  for (const [name, experiment] of Object.entries(EXPERIMENTS)) {
    // Trying to access one of the excluded paths returns a 404.
    // We do this to prevent direct access to the experiment page.
    if (experiment.exclude.some((regex) => regex.test(url.pathname))) {
      url.pathname = '/404'
      return NextResponse.rewrite(url)
    }
    if (!experiment.active) continue
    // Match the experiment to the current pathname
    if (!experiment.matcher.some((regex) => regex.test(url.pathname))) continue

    // Get the experiment from Edge Config
    const experimentConfig = await getExperiment(name as Experiments)
    // If it's not active, we don't need to do anything else
    if (!experimentConfig?.active) break

    // Decide if the user should be part of the experiment. For example purposes we don't
    // use a third party service like Split.io, but this is where you would integrate it.
    if (typeof experiments[name] !== 'number') {
      experiments[name] = experiment.enabled(req) ? 1 : 0
      changeCookie = true
    }

    // Our server-side experiments always return a response, so that a path only matches
    // the rewrite of one experiment.
    if (experiments[name] === 1) res = experiment.handler(req)
    // Because we already matched an experiment, we can break out of the loop
    break
  }

  if (changeCookie) setExperimentsCookie(res, experiments)
  return res
}
