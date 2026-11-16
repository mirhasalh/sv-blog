<script lang="ts">
  import 'highlight.js/styles/atom-one-dark.css'

  import Sanitized from '#lib/components/Sanitized.svelte'
  import { domain } from '#lib/config.ts'
  import { formatDate, getImageSizeFromUrl } from '#lib/utils/index.ts'

  import { browser } from '$app/env'

  import { onMount } from 'svelte'

  import { PostPageState } from './state.svelte'
  import type { PageData } from './$types'
  import { l10n } from '#lib/shared.svelte.ts'

  let { data }: { data: PageData } = $props(),
    pageState = new PostPageState(),
    parsedEl: HTMLElement,
    toc = $state<App.TocItem[]>([]),
    sizes = $derived(getImageSizeFromUrl(data.post.image))

  const keywords = $derived([data.post.title, ...data.post.tags])

  if (browser) pageState.registerLanguages()

  const onElement = () => {
    pageState.highlightElement(parsedEl)
    pageState.setPreStyle(parsedEl)
    pageState.setHeadingStyle(parsedEl)
    pageState.setPStyle(parsedEl)
    pageState.setCodeBlockStyle(parsedEl)
    pageState.setInlineCodeStyle(parsedEl)
    pageState.setLinkStyle(parsedEl)
    pageState.setBlockquoteStyle(parsedEl)
    pageState.setTableStyle(parsedEl)
    pageState.setTableHeaderStyle(parsedEl)
    pageState.setUnorderedListStyle(parsedEl)
    pageState.setOrderedListStyle(parsedEl)
    toc = pageState.buildToc(parsedEl)
  }

  onMount(() => {
    if (parsedEl) onElement()
  })
</script>

<svelte:head>
  <title>{data.post.title}</title>
  <meta name="description" content={data.post.excerpt} />
  <meta name="keywords" content={keywords.join(', ')} />

  <meta property="og:title" content={data.post.title} />
  <meta property="og:description" content={data.post.excerpt} />
  <meta property="og:image" content={`${domain}/${data.post.slug}.png`} />
  <meta property="og:url" content={`${domain}/post/${data.post.slug}`} />
  <meta property="og:type" content="article" />
  <meta property="article:published_time" content={data.post.publishedAt} />
  <meta property="article:tag" content={data.post.tags.join(', ')} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={data.post.title} />
  <meta name="twitter:description" content={data.post.excerpt} />
  <meta name="twitter:image" content={`${domain}/${data.post.slug}.png`} />

  <link rel="canonical" href={`${domain}/post/${data.post.slug}`} />
</svelte:head>

<section class="mx-auto max-w-5xl">
  <header class="px-4 pt-10 sm:px-8">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <ul class="roboto-serif">
        <li><a title="Home" href="/">{l10n('link.home')}</a></li>
        <li><a title="Posts" href="/posts">{l10n('link.posts')}</a></li>
        <li><a class="" href={`/post/${data.post.slug}`}>{data.post.slug}</a></li>
      </ul>
    </nav>
    <h1 class="merriweather mt-10 text-3xl font-bold">{data.post.title}</h1>
    <p class="roboto-serif py-6 text-sm opacity-60">{data.post.excerpt}</p>
    <figure>
      <img class="rounded-lg" src={`${domain}/${data.post.slug}.png`} alt={data.post.title} width={sizes.width} height={sizes.height} />
      <figcaption class="hidden">{data.post.title}</figcaption>
    </figure>
  </header>
  <header class="navbar px-4 pt-6 sm:px-8">
    <div class="flex-1">
      <span class="roboto-serif">{data.post.category}</span>
      <br />
      <time class="roboto-serif text-sm opacity-60" datetime={data.post.publishedAt}>{`${formatDate(data.post.publishedAt)} | `}</time>
      <span class="roboto-serif text-sm opacity-60">{l10n('readingTime.minute')(data.post.readingTime)}</span>
    </div>
  </header>
  <div class="mt-4 mb-8 px-4 sm:px-8">
    <div class="w-full border-b-1 border-primary"></div>
  </div>
</section>
<div class="flex flex-col xl:flex-row-reverse">
  <aside class="xl-pb-0 border-base-content/10 px-8 pb-10 lg:border-l-1 lg:pt-4 xl:min-w-md xl:px-0" aria-labelledby="table-of-contents">
    <div class="collapse border border-base-300 bg-base-100 xl:collapse-open xl:sticky xl:top-[80px] xl:w-max xl:border-none xl:bg-base-200">
      <input type="checkbox" aria-label={`${l10n('toc')}`} aria-controls="post-toc" />
      <h2 id="table-of-contents" class="merriweather collapse-title font-semibold xl:pl-10 xl:text-2xl">{l10n('toc')}</h2>
      <div id="post-toc" class="collapse-content text-sm">
        <ul class="menu">
          {#each toc as tocItem (tocItem.id)}
            <li>
              <button class="toc-item link link-hover" type="button" onclick={() => pageState.onTocItem(tocItem.id)}>
                <span class="roboto-serif">{tocItem.text}</span>
              </button>
              {#if tocItem.children.length}
                <ul>
                  {#each tocItem.children as item (item.id)}
                    <li>
                      <button class="toc-item link link-hover" type="button" onclick={() => pageState.onTocItem(item.id)}>
                        <span class="roboto-serif">{item.text}</span>
                      </button>
                    </li>
                  {/each}
                </ul>
              {/if}
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </aside>
  <main class="min-w-0 xl:flex-1">
    <article class="article w-full p-4 sm:p-8" bind:this={parsedEl}>
      <Sanitized html={data.code} />
    </article>
    <ul class="flex gap-1 px-4 pb-10 md:px-8">
      {#each data.post.tags as tag}
        <li>
          <a class="roboto-serif btn btn-secondary" href={`/posts/s/?tag=${tag}`}>
            {tag}
          </a>
        </li>
      {/each}
    </ul>
  </main>
</div>
