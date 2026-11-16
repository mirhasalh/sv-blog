import { getPosts } from '#lib';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const { page, limit } = await request.json()
  const posts = await getPosts(page, limit)
  return Response.json(posts)
}