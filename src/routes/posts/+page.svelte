<script lang="ts">
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'

  import ArrowDownward from '#icons/material/ArrowDownward.svelte'
  import ArrowInsert from '#icons/material/ArrowInsert.svelte'
  import Check from '#icons/material/Check.svelte'
  import Search from '#icons/material/Search.svelte'

  import { domain, postsLimit } from '#lib/config.js'
  import { fetchGetPosts, fetchSearchPosts } from '#lib/fetchers/index.js'
  import { app, l10n } from '#lib/shared.svelte.js'
  import { formatDate } from '#lib/utils/index.js'
  import { PostsPageStates } from './state.svelte'

  let pageState = new PostsPageStates()
  let { data } = $props()
  let query = $state('')
  let postsToShow = $state<App.Post[]>([])
  let results = $state<App.Post[]>([])
  let page = $state(1)
  let end = $state(0)
  let loadingPosts = $state(false)

  const obj = $derived(data as any),
    posts = $derived(obj.posts as App.Post[]),
    totalPosts = $derived(obj.count as number)

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault()
    const { search, category, tag } = pageState.parseQuery(query)
    const res = await fetchSearchPosts({ search, category, tag, page: 1, limit: 3 })
    results = res
  }

  const onSeeMore = async () => {
    if (loadingPosts) return
    page += 1
    if (app.loadedPages.includes(page)) {
      const nextPosts = app.loadedPosts.slice((page - 1) * postsLimit, page * postsLimit)

      for (const post of nextPosts) {
        postsToShow.push(post)
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
    } else {
      loadingPosts = true
      app.loadedPages.push(page)
      const newPosts = await fetchGetPosts({ page, limit: postsLimit })
      app.loadedPosts = [...app.loadedPosts, ...newPosts]
      for (const post of newPosts) {
        postsToShow.push(post)
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
      loadingPosts = false
    }
  }

  const openSearch = () => {
    const modal = document.getElementById('search_modal') as HTMLDialogElement
    if (modal) modal.showModal()
  }

  const onSuggestion = (text: string) => (query = text)

  onMount(() => {
    postsToShow = posts
    if (!app.loadedPosts.length) app.loadedPosts = posts
    if (!app.loadedPages.includes(1)) app.loadedPages.push(1)
    end = Math.ceil(totalPosts / postsLimit)
  })
</script>

<svelte:head>
  <title>Posts | Irhas</title>
  <meta name="description" content="Browse Irhas's articles, insights, and personal stories." />
  <link rel="canonical" href={`${domain}/posts`} />

  <meta property="og:title" content="Posts | Irhas" />
  <meta property="og:description" content="Browse Irhas's articles, insights, and personal stories." />
  <meta property="og:url" content={`${domain}/posts`} />
  <meta property="og:type" content="website" />

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Posts | Irhas" />
  <meta name="twitter:description" content="Browse Irhas's articles, insights, and personal stories." />
</svelte:head>

<dialog id="search_modal" class="modal" aria-labelledby="search">
  <div class="modal-box">
    <h2 id="search" class="sr-only">{l10n('uiLabel.search')}</h2>
    <form onsubmit={onSubmit}>
      <label class="roboto-serif input w-full">
        <input type="search" bind:value={query} required aria-label={`${l10n('uiLabel.search')}`} placeholder="@category #tag search words" />
        <Search class="opacity-50" />
      </label>
    </form>
    {#if results.length}
      <ul class="list pt-4">
        {#each results as post (post.id)}
          <li class="list-row">
            <time class="roboto-serif text-xs opacity-60" datetime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <a class="list-col-wrap link link-hover" href={`/post/${post.slug}`}>
              <h2 class="merriweather truncate font-semibold">{post.title}</h2>
              <p class="roboto-serif line-clamp-2 text-xs opacity-80">{post.excerpt}</p>
            </a>
          </li>
        {/each}
      </ul>
    {:else}
      <ul class="menu w-full p-0 pt-4">
        {#each pageState.suggestions as s (s.id)}
          <li>
            <button class="btn-suggestion justify-between" onclick={() => onSuggestion(s.text)}>
              <span class="roboto-serif opacity-60">{s.text}</span>
              <ArrowInsert class="trailing h-4 w-4" />
            </button>
          </li>
        {/each}
      </ul>
    {/if}
    <div class="modal-action">
      <form method="dialog">
        <button class="roboto-serif btn">{l10n('uiLabel.close')}</button>
      </form>
    </div>
  </div>
</dialog>
<div class="mx-auto max-w-3xl">
  <header class="px-4 pt-20 sm:px-8">
    <h1 id="all-posts" class="merriweather text-3xl">{l10n('postsSection.heading')}</h1>
    <p class="roboto-serif py-6">{l10n('postsSection.paragraph')}</p>
    <div class="flex justify-end">
      <button class="btn btn-square" aria-label={`${l10n('uiLabel.search')}`} onclick={openSearch}>
        <Search class="h-5 w-5 opacity-50" />
      </button>
    </div>
  </header>
  <div class="px-4 pt-8 sm:px-8">
    <div class="w-full border-b-1 border-primary/10"></div>
  </div>
  <main aria-labelledby="all-posts">
    <section class="hero">
      <div class="hero-content w-full px-0 sm:px-4">
        {#if postsToShow.length}
          <ul class="list">
            {#each postsToShow as post (post.id)}
              <li class="list-row" transition:fly={{ duration: 400, y: 100 }}>
                <div class="roboto-serif flex gap-4 opacity-60">
                  <span class="font-semibold">{post.category}</span>
                  <span aria-hidden="true">•</span>
                  <time datetime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </div>
                <a class="list-col-wrap link link-hover" href={`/post/${post.slug}`}>
                  <h2 class="merriweather text-xl">{post.title}</h2>
                  <p class="roboto-serif pt-2 text-sm opacity-80">{post.excerpt}</p>
                </a>
              </li>
            {/each}
            <li class="flex justify-center p-10">
              {#if page >= end}
                <div class="roboto-serif tooltip" data-tip="All posts loaded">
                  <button class="btn btn-circle btn-sm" type="button" disabled>
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
          <ul class="list w-full">
            {#each Array.from({ length: 6 }) as _}
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
