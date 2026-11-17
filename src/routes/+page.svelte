<script lang="ts">
  import { onMount } from 'svelte'

  import { domain, postsLimit } from '#lib/config.ts'
  import { app, l10n } from '#lib/shared.svelte.ts'
  import { fetchGetPosts } from '#lib/fetchers/index.ts'
  import { formatDate, getImageSizeFromUrl } from '#lib/utils/index.ts'

  import Marquee from '#components/Marquee.svelte'
  import PixelCanvas from '#components/PixelCanvas.svelte'

  import Dart from '#logos/Dart.svelte'
  import Figma from '#logos/Figma.svelte'
  import Flutter from '#logos/Flutter.svelte'
  import Go from '#logos/Go.svelte'
  import Java from '#logos/Java.svelte'
  import Next from '#logos/Next.svelte'
  import Nuxt from '#logos/Nuxt.svelte'
  import Rive from '#logos/Rive.svelte'
  import Spring from '#logos/Spring.svelte'
  import Svelte from '#logos/Svelte.svelte'
  import Swift from '#logos/Swift.svelte'

  import type { LayoutData } from './$types'
  import { HomePageState } from './state.svelte'
  import KeyboardDoubleArrowLeft from '#lib/components/icons/material/KeyboardDoubleArrowLeft.svelte'
  import KeyboardDoubleArrowRight from '#lib/components/icons/material/KeyboardDoubleArrowRight.svelte'
  import RiveCanvas from '#lib/components/RiveCanvas.svelte'

  let { data }: { data: LayoutData } = $props()

  const obj = $derived(data as any),
    posts = $derived(obj.posts as App.Post[]),
    totalPosts = $derived(obj.count as number),
    mobileApps = $derived(obj.apps as App.MobileApp[])

  let pageState = new HomePageState()
  let timeout: ReturnType<typeof setTimeout>
  let page = $state(1)
  let end = $state(0)
  let loadingPosts = $state(false)
  let postsToShow = $state<App.Post[]>([])
  let postEl = $state<HTMLElement | null>(null)
  let firstSixPosts = $derived(posts.slice(0, 6))
  let postElWidth = $state(0)
  // Breakpoints (640px / 768px) minus 32px of horizontal hero padding
  let postColumnWidth = $derived(postElWidth <= 608 ? postElWidth : postElWidth <= 736 ? postElWidth / 2 : postElWidth / 3)

  const initMsnry = async () => {
    if (postEl) {
      const rect = postEl?.getBoundingClientRect()
      postElWidth = rect?.width || 0
      await pageState.initMasonryLayout(postEl, '.post-item', postColumnWidth, true)
    }
  }

  const onResize = () => {
    clearTimeout(timeout)
    timeout = setTimeout(async () => {
      await initMsnry()
    }, 1000)
  }

  const onLoadPosts = async (nav: string) => {
    if (nav === 'next') {
      page += 1
      if (app.loadedPages.includes(page)) {
        postsToShow = app.loadedPosts.slice((page - 1) * postsLimit, page * postsLimit)
      } else {
        loadingPosts = true
        app.loadedPages.push(page)
        const newPosts = await fetchGetPosts({ page, limit: postsLimit })
        app.loadedPosts = [...app.loadedPosts, ...newPosts]
        postsToShow = newPosts
        loadingPosts = false
      }
    } else {
      page -= 1
      postsToShow = app.loadedPosts.slice((page - 1) * postsLimit, page * postsLimit)
    }
  }

  onMount(() => {
    initMsnry()
    postsToShow = posts
    if (!app.loadedPosts.length) app.loadedPosts = posts
    if (!app.loadedPages.includes(1)) app.loadedPages.push(1)
    end = Math.ceil(totalPosts / postsLimit)
  })
</script>

<svelte:window onresize={() => onResize()} />

<svelte:head>
  <title>Irhas – Personal blog, experiences & reflections</title>
  <meta name="description" content="Welcome to Irhas's personal blog. A collection of experiences, thoughts, things learned, and stories from work, life, and everyday discoveries." />
  <meta name="keywords" content="Irhas, personal blog, personal website, life experiences, reflections, learning, work experiences, creativity, technology, Indonesia" />
  <meta name="author" content="Irhas" />
  <link rel="canonical" href="https://irhas.site" />

  <meta property="og:title" content="Irhas – Personal blog, experiences & reflections" />
  <meta property="og:description" content="A personal corner of the internet where Irhas shares things he's learning, making, and thinking about." />
  <meta property="og:image" content="https://irhas.site/og-image.jpg" />
  <meta property="og:url" content="https://irhas.site" />
  <meta property="og:type" content="website" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Irhas – Personal blog, experiences & reflections" />
  <meta name="twitter:description" content="A personal corner of the internet for thoughts, experiences, discoveries, and things worth sharing." />
  <meta name="twitter:image" content="https://irhas.site/twitter-image.jpg" />
  <meta name="twitter:site" content="@irhasdev" />
</svelte:head>

<main class="bg-base-200">
  <section id="hero_1" class="relative hero min-h-[calc(100vh-256px)]" aria-labelledby="greeting">
    <PixelCanvas />
    <div class="curtain-left bg-base-200"></div>
    <div class="curtain-right bg-base-200"></div>
    <div class="relative hero-content z-10 w-full max-w-5xl flex-col justify-between lg:flex-row">
      <div class="pt-6 text-center lg:text-start">
        <h1 id="greeting" class="merriweather reveal-fade-fly-blur text-3xl font-bold md:text-5xl xl:text-7xl">
          <img class="animate-wave inline-block w-10 pb-2 md:w-16 md:pb-4 xl:w-22" src="./waving-hand.svg" alt="Waving hand" width="100" />
          {l10n('greetings.hello')}
          <br />
          {l10n('greetings.name')}
        </h1>
        <p class="roboto-serif reveal-fade-fly-blur animation-delay-150 max-w-sm py-6 text-sm md:text-base">
          {l10n('greetings.message')}
        </p>
      </div>
      <img class="reveal-fade-fly-blur animation-delay-300 w-full max-w-sm rounded-2xl border-1 border-primary/60" src="https://irhas.site/IMG_20250501-170202.webp" width="1080" height="800" alt="Irhas" />
    </div>
  </section>
  <section class="reveal-fade-fly-blur animation-delay-700 relative" aria-labelledby="technology-stack">
    <h2 id="technology-stack" class="merriweather p-2 text-center font-bold">{l10n('marqueeTitle')}</h2>
    <Marquee class="marquee-container">
      <div class="flex gap-1">
        {#each pageState.techStacks as tech (tech.id)}
          <div class="flex items-center justify-center p-6">
            {#if tech.title === 'Flutter'}
              <Flutter />
            {:else if tech.title === 'Figma'}
              <Figma />
            {:else if tech.title === 'Go'}
              <Go />
            {:else if tech.title === 'Java'}
              <Java />
            {:else if tech.title === 'Next'}
              <Next />
            {:else if tech.title === 'Nuxt'}
              <Nuxt />
            {:else if tech.title === 'Spring'}
              <Spring />
            {:else if tech.title === 'Svelte'}
              <Svelte />
            {:else if tech.title === 'Swift'}
              <Swift />
            {:else if tech.title === 'Rive'}
              <Rive />
            {:else}
              <Dart />
            {/if}
          </div>
        {/each}
      </div>
    </Marquee>
  </section>
  <section class="hero" aria-labelledby="latest-posts">
    <div class="hero-content w-full flex-col">
      <header class="navbar border-b-1 border-base-content/5">
        <div class="flex-1">
          <h2 id="latest-posts" class="merriweather p-2 text-xl font-bold">{l10n('latestPosts')}</h2>
        </div>
      </header>
      <ul class={`${postColumnWidth === 0 ? 'flex w-full flex-wrap' : 'w-full'}`} aria-labelledby="latest-posts" bind:this={postEl}>
        {#each firstSixPosts as post (post.id)}
          {@const sizes = getImageSizeFromUrl(post.image)}
          {@const style = postColumnWidth === 0 ? 'width: auto;' : `width:${postColumnWidth}px;`}
          <li class="post-item p-1" {style} class:max-w-xs={postColumnWidth === 0}>
            <div class="border-1 border-primary/10 bg-base-100">
              <div class="flex gap-4 p-4">
                <a class="roboto-serif link text-xs link-hover opacity-80" href={`/posts/s/?category=${post.category.toLocaleLowerCase()}`}>
                  {post.category}
                </a>
                <time class="roboto-serif text-xs opacity-80" datetime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </div>
              <a class="post-details block" href={`/post/${post.slug}`} aria-label={post.title}>
                <figure>
                  <img src={`${domain}/${post.image}`} alt={post.title} width={sizes.width} height={sizes.height} />
                </figure>
                <h3 class="merriweather post-title mt-4 px-4 font-bold xl:text-2xl">
                  {post.title}
                </h3>
                <p class="roboto-serif post-excerpt px-4 pt-2 pb-4 text-sm">
                  {post.excerpt}
                </p>
              </a>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </section>
  <section class="hero" aria-labelledby="all-posts">
    <div class="hero-content mt-20 mb-10 w-full max-w-xl flex-col rounded-lg bg-base-100 py-10">
      <header class="w-full border-b-1 border-base-content/5 px-4">
        <div class="text-start">
          <h2 id="all-posts" class="merriweather text-2xl">{l10n('allPosts')}</h2>
          <p class="roboto-serif pt-10 pb-8">
            <span>{totalPosts}</span>
            <span class="text-xs uppercase opacity-60">{l10n('posts')}</span>
          </p>
        </div>
      </header>
      {#if loadingPosts}
        <ul class="list w-full" aria-labelledby="all-posts" aria-busy="true">
          {#each Array.from({ length: 6 }, (_, index) => index) as index (index)}
            <li class="list-row">
              <div class="flex flex-col gap-1">
                <div class="h-4 w-40 skeleton"></div>
                <div class="h-4 w-48 skeleton"></div>
              </div>
            </li>
          {/each}
        </ul>
      {:else}
        <ul class="list" aria-labelledby="all-posts">
          {#each postsToShow as post (post.id)}
            <li class="list-row">
              <div class="flex gap-4">
                <a class="roboto-serif link text-sm font-semibold link-hover opacity-60" href={`/posts/s/?category=${post.category.toLocaleLowerCase()}`}>
                  {post.category}
                </a>
                <time class="roboto-serif text-sm opacity-60" datetime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </div>
              <a class="list-col-wrap block link link-hover" href={`/post/${post.slug}`} aria-label={post.title}>
                <h3 class="merriweather font-semibold">{post.title}</h3>
                <p class="roboto-serif text-xs opacity-80">{post.excerpt}</p>
              </a>
            </li>
          {/each}
        </ul>
      {/if}
      <nav class="join" aria-labelledby="all-posts">
        <button class="btn join-item" type="button" aria-label="Previous page" onclick={() => onLoadPosts('prev')} disabled={page <= 1}>
          <KeyboardDoubleArrowLeft class="h-4 w-4" />
        </button>
        <span class="roboto-serif btn join-item" aria-current="page">
          {l10n('uiLabel.page')}
          {page}
        </span>
        <button class="btn join-item" type="button" aria-label="Next page" onclick={() => onLoadPosts('next')} disabled={page >= end}>
          <KeyboardDoubleArrowRight class="h-4 w-4" />
        </button>
      </nav>
    </div>
  </section>
  <section class="hero" aria-labelledby="rive-animations">
    <div class="hero-content max-w-3xl flex-col py-20">
      <div class="text-center">
        <h2 id="rive-animations" class="merriweather text-3xl font-bold">
          {l10n('riveSection.heading')}
        </h2>
        <p class="roboto-serif py-6">
          {l10n('riveSection.paragraphPrefix')}
          <a class="link link-primary" href="https://rive.app/" target="_blank" rel="noopener noreferrer" aria-describedby="open-in-new-tab"> Rive. </a>
          <span id="open-in-new-tab" class="sr-only">Opens in a new tab.</span>
          {l10n('riveSection.paragraphSuffix')}
        </p>
      </div>
      <ul class="flex flex-wrap items-center justify-center gap-2">
        {#each pageState.avatars as avatar (avatar.id)}
          <li>
            <div class="card border-1 border-primary/30 bg-base-100">
              <RiveCanvas fileName={avatar.file} width={200} height={200} />
              <div class="card-body">
                <p class="roboto-serif text-center">{avatar.fileSize} kb</p>
              </div>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </section>
  <section class="hero" aria-labelledby="mobile-apps">
    <div class="hero-content my-20 w-full max-w-xl flex-col rounded-lg bg-base-100 py-10">
      <header class="border-b-1 border-base-content/5 px-4">
        <h2 id="mobile-apps" class="merriweather text-xl font-bold">{l10n('appsSection.heading')}</h2>
        <p class="roboto-serif py-6 text-sm">{l10n('appsSection.paragraph')}</p>
      </header>
      <ul class="list">
        {#each mobileApps as app (app.id)}
          <li class="list-row">
            <div>
              <figure>
                <img class="rounded-sm" src={`${domain}/${app.icon}`} width={40} height={40} alt="" />
              </figure>
            </div>
            <div>
              <span class="roboto-serif font-semibold opacity-60">{app.year}</span>
              <a class="merriweather block link font-bold link-hover" href={`/app/${app.slug}`}>
                {app.title}
              </a>
            </div>
            <a class="roboto-serif list-col-wrap block link text-xs link-hover" href={`/app/${app.slug}`}>
              {app.shortDescription}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </section>
</main>
