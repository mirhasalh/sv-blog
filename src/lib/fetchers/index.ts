export const fetcher = async (path: string, data: any, method = "POST") => {
  const headers = { "Content-Type": "application/json" }
  const formattedData: any = { method, headers }

  if (method !== "GET" && method !== "HEAD" && data) {
    formattedData.body = JSON.stringify(data)
  }

  const result = await fetch(`/api/${path}`, formattedData)

  return await result.json()
}

export const fetchGetPosts = async (request: any) => {
  return await fetcher('get-posts', request)
}

export const fetchCountResults = async (request: any) => {
  return await fetcher('count-results', request)
}

export const fetchSearchPosts = async (request: any) => {
  return await fetcher('search-posts', request)
}
