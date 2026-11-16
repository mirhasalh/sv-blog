<script lang="ts">
  import './layout.css'

  import { onMount } from 'svelte'

  import { browser } from '$app/env'
  import { onNavigate } from '$app/navigation'

  import favicon from '#lib/assets/favicon.svg'
  import { app } from '#lib/shared.svelte.ts'

  import type { LayoutProps } from './$types'

  import { HomePageState } from './state.svelte'

  import Avatar from '#components/Avatar.svelte'
  import Footer from '#components/Footer.svelte'
  import LanguageSettings from '#components/LanguageSettings.svelte'
  import LightSwitch from '#components/LightSwitch.svelte'
  import NavBar from '#components/NavBar.svelte'

  if (browser) {
    const currentTheme = document.documentElement.getAttribute('data-theme')
    if (currentTheme === 'light' || currentTheme === 'dark') app.theme = currentTheme
  }

  let { children }: LayoutProps = $props(),
    pageState = new HomePageState()

  const onLightSwitch = (theme: string) => {
    pageState.setTheme(theme)
    localStorage.setItem('theme', theme)
    app.theme = theme
  }

  onNavigate((navigation) => {
    if (!document.startViewTransition) return

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve()
        await navigation.complete
      })
    })
  })

  onMount(() => {
    app.locale = pageState.getLang()
    app.theme = pageState.getTheme()
    pageState.setTheme(app.theme)
  })
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<NavBar>
  {#snippet actions()}
    <LanguageSettings />
    <Avatar isOpenToWork={true} />
  {/snippet}
</NavBar>
{@render children()}
<Footer>
  {#snippet trailing()}
    <LightSwitch {onLightSwitch} />
  {/snippet}
</Footer>
