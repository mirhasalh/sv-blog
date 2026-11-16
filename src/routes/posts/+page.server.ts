import { getPosts, countPosts } from '#lib'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  const count = await countPosts()
  const posts = await getPosts(1, 6)
  return { posts, count }
}
