export class PostsPageStates {
  readonly suggestions = [
    { id: 0, text: '@tutorials' },
    { id: 1, text: '#python' },
    { id: 2, text: 'svelte' }
  ]

  parseQuery(input: string) {
    let category: string | null = null
    let tag: string | null = null
    const words: string[] = []

    for (const token of input.trim().split(/\s+/).filter(Boolean)) {
      if (token.startsWith('#') && token.length > 1) {
        tag = token.slice(1).toLowerCase()
      } else if (token.startsWith('@') && token.length > 1) {
        category = token.slice(1).toLowerCase()
      } else {
        words.push(token)
      }
    }

    return {
      search: words.length ? words.join(' ') : null,
      category,
      tag
    }
  }

  buildQuery({ search, category, tags }: {
    search: string; category: string; tags: string[]
  }) {
    return [category && `@${category}`, ...tags.map((t) => `#${t}`), search]
      .filter(Boolean)
      .join(' ')
  }
}