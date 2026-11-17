import { getWorkHistory } from '#lib'
import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
  return { workHistory: await getWorkHistory(1, 10) }
}