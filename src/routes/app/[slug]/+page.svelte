<script lang="ts">
  import AppleStore from '#icons/download/AppleStore.svelte'
  import GooglePlay from '#icons/download/GooglePlay.svelte'
  import { domain } from '#lib/config.ts'
  import { l10n } from '#lib/shared.svelte.ts'
  import { formatDate, getImageSizeFromUrl } from '#lib/utils/index.ts'

  import type { PageData } from './$types'
  import { AppPageState } from './state.svelte'

  let { data }: { data: PageData } = $props(),
    pageState = new AppPageState()

  const mobileApp = $derived(data.app as App.MobileApp),
    sizes = $derived(getImageSizeFromUrl(mobileApp.featureGraphic))
</script>

<svelte:head>
  <title>{`${mobileApp.title} (${mobileApp.year})`}</title>
  <meta name="description" content={mobileApp.shortDescription} />
  <meta property="og:title" content={`${mobileApp.title} (${mobileApp.year})`} />
  <meta property="og:description" content={mobileApp.description} />
  <meta property="og:image" content={`${domain}/${mobileApp.featureGraphic}`} />
  <meta property="og:url" content={`${domain}/app/${data.slug}`} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={mobileApp.title} />
  <meta name="twitter:description" content={mobileApp.description} />
  <meta name="twitter:image" content={`${domain}/${mobileApp.featureGraphic}`} />
  <link rel="canonical" href={`${domain}/app/${data.slug}`} />
</svelte:head>

<div class="mx-auto max-w-3xl">
  <header class="border-b-1 border-base-content/5 px-4 pt-20 sm:px-8">
    {#if mobileApp.production}
      <span class="roboto-serif badge badge-success">{l10n('appStatus.released')}</span>
    {:else}
      <span class="roboto-serif badge badge-warning">{l10n('appStatus.testing')}</span>
    {/if}
    <h1 id="app-name" class="merriweather pt-10 text-3xl">{mobileApp.title}</h1>
    <p class="roboto-serif py-6 text-xs opacity-60">{mobileApp.shortDescription}</p>
    <figure>
      <img src={`${domain}/${mobileApp.featureGraphic}`} width={sizes.width} height={sizes.height} alt={mobileApp.title} />
      <figcaption class="hidden">{mobileApp.title}</figcaption>
    </figure>
    <time class="roboto-serif block py-6 opacity-60" id="year" datetime={`${mobileApp.year}`}>{mobileApp.year}</time>
    <time class="roboto-serif hidden" datetime={mobileApp.createdAt}>{formatDate(mobileApp.createdAt)}</time>
  </header>
  <main aria-labelledby="app-name">
    <section class="hero">
      <div class="hero-content my-10 flex-col">
        <img class="rounded-xl border-1 border-base-content/5" src={`${domain}/${mobileApp.icon}`} width="100" height="100" alt={mobileApp.title} />
        <span id="open-in-new-tab" class="sr-only">Opens in a new tab.</span>
        <ul class="flex justify-center gap-2 pt-8">
          {#each mobileApp.urls.filter((v) => v.show) as url}
            <li>
              {#if url.slug === 'internal-testing'}
                <button class="btn btn-primary" onclick={() => pageState.requestInternalTesting()}>
                  <span>{l10n('joinTesting')}</span>
                </button>
              {:else}
                <a class="block rounded-lg border border-base-content/5 transition-colors duration-200 hover:border-primary" href={url.url} target="_blank" rel="noopener noreferrer" aria-describedby="open-in-new-tab">
                  {#if url.slug === 'android'}
                    <GooglePlay />
                  {:else if url.slug === 'ios'}
                    <AppleStore />
                  {:else}
                    <span>{url.title}</span>
                  {/if}
                </a>
              {/if}
            </li>
          {/each}
        </ul>
        {#if !mobileApp.production}
          <p class="roboto-serif py-6 text-center"><small>{l10n('thankNote')}</small></p>
        {/if}
        <div class="py-20">
          <h2 id="privacy" class="merriweather text-2xl font-bold">{l10n('privacySection.heading')}</h2>
          <p class="roboto-serif py-6 opacity-60">
            {l10n('privacySection.timePrefix')} <time datetime={mobileApp.effectiveDateOfPrivacy}>{formatDate(mobileApp.effectiveDateOfPrivacy)}</time>
          </p>
          <ol class="list-mb-4 list space-y-2">
            {#each mobileApp.privacyDeclarations as declaration, i}
              <li>
                <p class="roboto-serif text-base">
                  <strong>{i + 1}. {declaration.title}</strong>
                  <br />
                  {declaration.text}
                </p>
              </li>
            {/each}
          </ol>
        </div>
      </div>
    </section>
  </main>
</div>
