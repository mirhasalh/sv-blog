<script lang="ts">
  import { page } from '$app/state'
  import type { Snippet } from 'svelte'
  import Logo from './Logo.svelte'
  import Menu from './icons/material/Menu.svelte'
  import { l10n } from '#lib/shared.svelte.ts'

  let { actions }: { actions?: Snippet } = $props()

  const links = [
    { id: 0, slug: 'home', href: '/' },
    { id: 1, slug: 'posts', href: '/posts' },
    { id: 2, slug: 'about', href: '/about' }
  ]
</script>

<header class="navbar sticky top-0 z-30 border-b-1 border-base-content/5 bg-base-100">
  <div class="navbar-start">
    <button class="btn btn-square btn-ghost sm:hidden" popovertarget="popover-1" style="anchor-name:--anchor-1">
      <Menu class="h-5 w-5" />
    </button>
    <ul class="menu dropdown w-52 rounded-box bg-base-100 shadow-sm sm:hidden" popover id="popover-1" style="position-anchor:--anchor-1">
      {#each links as link (link.id)}
        <li>
          <a class="roboto-serif" href={link.href}>
            {l10n(`link.${link.slug}`)}
          </a>
        </li>
      {/each}
    </ul>
    <a class="btn btn-ghost text-start" href="/">
      <Logo width={30} height={30} />
      <p class="roboto-serif hidden text-xs leading-3 sm:block">
        <i>Irhas’<br />blog</i>
      </p>
    </a>
  </div>
  <nav class="navbar-center hidden sm:block" aria-label="main">
    <ul class="roboto-serif flex gap-8">
      {#each links as link (link.id)}
        {@const active = link.href === '/' ? false : link.href === page.route.id}
        <li>
          <a class="link link-hover" class:link-primary={active} href={link.href}>
            {l10n(`link.${link.slug}`)}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
  <div class="navbar-end gap-2">
    {#if actions}
      {@render actions()}
    {/if}
  </div>
</header>
