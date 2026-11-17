<script lang="ts">
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'
  import type { PageData } from './$types'

  import { domain, postsLimit } from '#lib/config.ts'
  import { fetchCountResults, fetchSearchPosts } from '#lib/fetchers/index.ts'
  import { formatDate } from '#lib/utils/index.ts'

  import ArrowDownward from '#icons/material/ArrowDownward.svelte'
  import Check from '#icons/material/Check.svelte'
  import Search from '#icons/material/Search.svelte'

  import { PostsPageStates } from './../state.svelte'
  import { l10n } from '#lib/shared.svelte.ts'

  let pageState = new PostsPageStates()
  let { data }: { data: PageData } = $props()
  let results = $state<App.Post[]>([])
  let query = $state('')
  let page = $state(1)
  let end = $state(0)
  let loadingPosts = $state(false)

  const obj = $derived(data as any),
    posts = $derived(obj.posts as App.Post[]),
    totalPosts = $derived(obj.count as number)

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault()
    page = 1
    const { search, category, tag } = pageState.parseQuery(query)
    const count = await fetchCountResults({ search, category, tag })
    end = Math.ceil(count / postsLimit)
    const posts = await fetchSearchPosts({ search, category, tag, page, limit: postsLimit })
    results = posts
  }

  const onSeeMore = async () => {
    if (loadingPosts) return
    page += 1
    loadingPosts = true
    const { search, category, tag } = pageState.parseQuery(query)
    const newPosts = await fetchSearchPosts({ search, category, tag, page, limit: postsLimit })
    for (const post of newPosts) {
      results.push(post)
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
    loadingPosts = false
  }

  const initQueryFromData = () => {
    let params = []
    if (data.category) params.push(`@${data.category}`)
    if (data.tag) params.push(`#${data.tag}`)
    if (data.search) params.push(data.search)
    query = params.join(' ')
  }

  onMount(() => {
    initQueryFromData()
    results = posts
    end = Math.ceil(totalPosts / postsLimit)
  })
</script>

<svelte:head>
  <title>Search posts | Irhas</title>
  <meta name="description" content="Search Irhas's articles by topic, category, or keyword." />
  <meta name="robots" content="noindex,follow" />
  <link rel="canonical" href={`${domain}/posts/s`} />

  <meta property="og:title" content="Search posts | Irhas" />
  <meta property="og:description" content="Search Irhas's articles by topic, category, or keyword." />
  <meta property="og:url" content={`${domain}/posts/s`} />
  <meta property="og:type" content="website" />

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Search posts | Irhas" />
  <meta name="twitter:description" content="Search Irhas's articles by topic, category, or keyword." />
</svelte:head>

<div class="mx-auto max-w-3xl">
  <header class="px-4 pt-20 sm:px-8">
    <form aria-label={`${l10n('uiLabel.search')}`} onsubmit={onSubmit}>
      <label class="roboto-serif input w-full">
        <input type="search" bind:value={query} required aria-label={`${l10n('uiLabel.search')}`} placeholder="@category #tag search words" />
        <Search class="opacity-50" />
      </label>
    </form>
  </header>
  <div class="px-4 pt-8 sm:px-8">
    <div class="w-full border-b-1 border-primary/10"></div>
  </div>
  <main>
    <section class="hero">
      <div class="hero-content">
        {#if results.length}
          <ul class="list">
            {#each results as post (post.id)}
              <li class="list-row" transition:fly={{ duration: 400, y: 100 }}>
                <div class="roboto-serif flex gap-4 opacity-60">
                  <span class="font-semibold">{post.category}</span>
                  <span aria-hidden="true">•</span>
                  <time datetime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </div>
                <a class="list-col-wrap link link-hover" href={`/post/${post.slug}`}>
                  <h3 class="merriweather text-xl">{post.title}</h3>
                  <p class="roboto-serif pt-2 text-sm opacity-80">{post.excerpt}</p>
                </a>
              </li>
            {/each}
            <li class="flex justify-center p-10">
              {#if page >= end}
                <div class="roboto-serif tooltip" data-tip="All posts loaded">
                  <button class="btn btn-circle btn-sm" type="button" aria-label="All posts loaded" disabled>
                    <Check class="h-4 w-4" />
                  </button>
                </div>
              {:else}
                <button class="btn" type="button" onclick={onSeeMore}>
                  {#if loadingPosts}
                    {l10n('uiLabel.loading')}
                    <span class="loading loading-sm loading-spinner" aria-hidden="true"></span>
                  {:else}
                    {l10n('uiLabel.loadMore')}
                    <ArrowDownward class="h-4 w-4" />
                  {/if}
                </button>
              {/if}
            </li>
          </ul>
        {:else}
          <ul class="list w-full" aria-hidden="true">
            {#each Array.from({ length: 6 }, (_, index) => index) as placeholder (placeholder)}
              <li class="list-row">
                <div class="flex flex-col gap-1">
                  <div class="h-4 w-40 skeleton"></div>
                  <div class="h-4 w-48 skeleton"></div>
                </div>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </section>
  </main>
</div>
