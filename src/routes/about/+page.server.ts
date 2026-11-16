import { getWorkHistory } from '#lib'
import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
  return { works: await getWorkHistory(1, 10) }
}