import { CMS_APIS } from '$app/env/private'
import { error } from '@sveltejs/kit'
import { encodeParam } from './utils'

export const getEnvVar = (data: string) => {
  try {
    JSON.parse(data)
  } catch (e) {
    return data
  }
  return JSON.parse(data)
}

export const findAllByKey = (obj: Record<string, any>, keyToFind: string): any[] => {
  return Object.entries(obj).reduce((acc: any[], [key, value]) => {
    if (key === keyToFind) {
      return acc.concat(value);
    } else if (typeof value === 'object' && value !== null) {
      return acc.concat(findAllByKey(value, keyToFind))
    }
    return acc
  }, [])
}

const publicEnv = getEnvVar(CMS_APIS)
const base = `${publicEnv.base}${publicEnv.version}`

interface SendOptions {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  path: string
  data?: unknown
  token?: string
}

async function send({ method, path, data, token }: SendOptions): Promise<any> {
  const opts: RequestInit = { method, headers: {} }

  if (data) {
    (opts.headers as Record<string, string>)['Content-Type'] = 'application/json'
    opts.body = JSON.stringify(data)
  }

  if (token) {
    (opts.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${base}${path}`, opts)
  const text = await res.text()

  if (res.ok) {
    return text ? JSON.parse(text) : {}
  }

  const errorMessage = text
    ? (findAllByKey(JSON.parse(text), 'cause')[0] || findAllByKey(JSON.parse(text), 'message')[0])
    : ''
  throw error(res.status, errorMessage)
}

export function get(path: string, token?: string): Promise<any> {
  return send({ method: 'GET', path, token })
}

export function del(path: string, token?: string): Promise<any> {
  return send({ method: 'DELETE', path, token })
}

export function post(path: string, data?: unknown, token?: string): Promise<any> {
  return send({ method: 'POST', path, data, token })
}

export function patch(path: string, data?: unknown, token?: string): Promise<any> {
  return send({ method: 'PATCH', path, data, token })
}

export function put(path: string, data?: unknown, token?: string): Promise<any> {
  return send({ method: 'PUT', path, data, token })
}

// Paths
const postsPrefix = publicEnv.postsPrefix,
  countPostsQuery = publicEnv.countPosts,
  postsSuffix = publicEnv.postsSuffix,
  postQuery = publicEnv.postQuery,
  countSearchResults = publicEnv.countSearchResults,
  searchPrefix = publicEnv.searchPrefix,
  searchSuffix = publicEnv.searchSuffix,
  appsPrefix = publicEnv.appsPrefix,
  appsSuffix = publicEnv.appsSuffix,
  appQuery = publicEnv.appQuery,
  workHistoryPrefix = publicEnv.workHistoryPrefix,
  workHistorySuffix = publicEnv.workHistorySuffix

export const getPosts = async (page: number, limit: number): Promise<App.Post[]> => {
  const from = (page - 1) * limit
  const to = from + limit
  const res = await get(`${postsPrefix}${from}...${to}${postsSuffix}`)
  return res.result
}

export const getPost = async (slug: string) => {
  const param = `slug=%22${slug}%22&perspective=drafts`
  const res = await get(postQuery + param)
  return (res.result as App.Post[])[0]
}

export const countResults = async (search: string, category: string, tag: string): Promise<number> => {
  const params = [
    `search=${encodeParam(search || null)}`,
    `category=${encodeParam(category || null)}`,
    `tag=${encodeParam(tag || null)}`
  ].join('&%24')

  const count = await get(`${countSearchResults}${params}&perspective=drafts`)
  return count.result
}

export const searchPosts = async (search: string, category: string, tag: string, page: number, limit: number): Promise<App.Post[]> => {
  const from = (page - 1) * limit
  const to = from + limit

  const params = [
    `search=${encodeParam(search || null)}`,
    `category=${encodeParam(category || null)}`,
    `tag=${encodeParam(tag || null)}`
  ].join('&%24')

  const res = await get(`${searchPrefix}${from}...${to}${searchSuffix}${params}&perspective=drafts`)
  return res.result
}

export const countPosts = async (): Promise<number> => {
  const res = await get(countPostsQuery)
  return res.result
}

export const getMobileApps = async (page: number, limit: number): Promise<App.MobileApp[]> => {
  const from = (page - 1) * limit
  const to = from + limit
  const res = await get(`${appsPrefix}${from}...${to}${appsSuffix}`)
  return res.result as App.MobileApp[]
}

export const getMobileApp = async (slug: string): Promise<App.MobileApp> => {
  const param = `slug=%22${slug}%22&perspective=drafts`
  const res = await get(`${appQuery}${param}`)
  return (res.result as App.MobileApp[])[0]
}

export const getWorkHistory = async (page: number, limit: number): Promise<App.WorkHistory[]> => {
  const from = (page - 1) * limit
  const to = from + limit
  const res = await get(`${workHistoryPrefix}${from}...${to}${workHistorySuffix}`)
  return res.result as App.WorkHistory[]
}

export const loadImage = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl)

    if (!response.ok) throw error(502, 'Failed to load image')

    const contentType = response.headers.get('content-type') ?? 'image/jpeg'
    const buffer = await response.arrayBuffer()

    return new Response(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000'
      }
    })
  } catch (err) {
    console.error('Proxy error:', err)
    throw error(500, 'Internal Server Error')
  }
}
