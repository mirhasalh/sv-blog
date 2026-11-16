import { searchPosts } from '#lib';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const { search, category, tag, page, limit } = await request.json()
  const posts = await searchPosts(search, category, tag, page, limit)
  return Response.json(posts)
}