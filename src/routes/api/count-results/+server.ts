
import { countResults } from '#lib';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const { search, category, tag } = await request.json()
  const count = await countResults(search, category, tag)
  return Response.json(count)
}