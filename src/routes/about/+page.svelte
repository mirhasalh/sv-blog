<script lang="ts">
  import TimelineTick from '#components/TimelineTick.svelte'
  import { domain } from '#lib/config.js'
  import { l10n } from '#lib/shared.svelte.ts'
  import { formatDate, isLessThanAYear } from '#lib/utils/index.ts'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props(),
    workHistory = $derived(data.workHistory)
</script>

<svelte:head>
  <title>About Irhas | Personal blog</title>
  <meta name="description" content="Learn about Irhas, his varied work experience, and what he's exploring next." />
  <link rel="canonical" href={`${domain}/about`} />

  <meta property="og:title" content="About Irhas | Personal blog" />
  <meta property="og:description" content="Learn about Irhas, his varied work experience, and what he's exploring next." />
  <meta property="og:url" content={`${domain}/about`} />
  <meta property="og:type" content="website" />

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="About Irhas | Personal blog" />
  <meta name="twitter:description" content="Learn about Irhas, his varied work experience, and what he's exploring next." />
</svelte:head>

<main>
  <section class="hero min-h-screen" aria-labelledby="about">
    <div class="hero-content w-full max-w-5xl flex-col justify-between pt-20 md:flex-row md:pt-0">
      <div class="text-center md:text-start">
        <h1 id="about" class="merriweather reveal-fade-fly-blur text-3xl font-bold md:text-5xl">
          {l10n('aboutSection.heading')}
        </h1>
        <p class="roboto-serif reveal-fade-fly-blur animation-delay-150 max-w-md py-6">
          {l10n('aboutSection.paragraph')}
        </p>
      </div>
      <img class="reveal-fade-fly-blur animation-delay-300 max-w-xs rounded-xl" src="https://irhas.site/IMG_20260819_165344_1080x1350.webp" width="1080" height="1350" alt="Irhas headshot" />
    </div>
  </section>
  <section class="hero" aria-labelledby="work-history">
    <div class="hero-content max-w-5xl flex-col pt-20 pb-20 md:pt-0">
      <div class="w-full px-4 text-start md:text-center">
        <h2 id="work-history" class="merriweather text-2xl font-bold md:text-3xl">{l10n('workHistorySection.heading')}</h2>
        <p class="roboto-serif py-6">{l10n('workHistorySection.paragraph')}</p>
        <div class="mt-4 mb-8">
          <div class="w-full border-b-1 border-primary"></div>
        </div>
      </div>
      <ul class="timeline timeline-vertical px-4 timeline-snap-icon max-md:timeline-compact">
        {#each workHistory as h, i (h.id)}
          {@const isEven = i % 2 == 0}
          {@const textStyle = isEven ? 'timeline-start mb-10 md:text-end' : 'timeline-end mb-10'}
          {@const lessThanAYear = isLessThanAYear(h.from, h.to)}
          <li>
            <div class="timeline-middle" aria-hidden="true">
              <TimelineTick />
            </div>
            <div class={textStyle}>
              {#if lessThanAYear}
                <time class="roboto-serif italic opacity-80" datetime={h.to}>{formatDate(h.to, { year: 'numeric' })}</time>
              {:else}
                <p class="roboto-serif italic opacity-80">
                  <time datetime={h.to}>{formatDate(h.from, { year: 'numeric' })}</time> -
                  <time datetime={h.to}>{formatDate(h.to, { year: 'numeric' })}</time>
                </p>
              {/if}
              <h3 class="merriweather pt-4 text-sm">{h.organization}</h3>
              <h4 class="merriweather font-bold">{h.role}</h4>
              <p class="roboto-serif pt-2 text-xs opacity-80">{h.description}</p>
            </div>
            {#if i !== workHistory.length - 1}
              <hr />
            {/if}
          </li>
        {/each}
      </ul>
      <a class="btn btn-primary" href="https://irhas.site/Resume_20250124-081909.pdf" target="_blank" rel="noopener noreferrer" aria-describedby="open-in-new-tab">
        <span class="roboto-serif">{l10n('seeCV')}</span>
      </a>
    </div>
  </section>
</main>
