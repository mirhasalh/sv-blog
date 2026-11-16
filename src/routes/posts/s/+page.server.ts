import { countResults, searchPosts } from '#lib'
import { postsLimit } from '#lib/config.ts'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
  const search = url.searchParams.get('search') ?? ''
  const category = url.searchParams.get('category') ?? ''
  const tag = url.searchParams.get('tag') ?? ''
  const count = await countResults(search, category, tag)
  const posts = await searchPosts(search, category, tag, 1, postsLimit)
  return { count, posts, search, category, tag }
}