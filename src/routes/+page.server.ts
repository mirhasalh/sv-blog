import type { PageServerLoad } from './$types'
import { getPosts, getMobileApps, countPosts } from '#lib'
import { postsLimit } from '#lib/config.ts'

export const load: PageServerLoad = async () => {
  const posts = await getPosts(1, postsLimit)
  const count = await countPosts()
  const apps = await getMobileApps(1, 6)
  return { posts, apps, count }
}
