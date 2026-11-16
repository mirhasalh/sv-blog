<script lang="ts">
  import { app } from '../shared.svelte.ts'
  import Contrast from './icons/material/Contrast.svelte'
  import Dark from './icons/material/Dark.svelte'
  import Light from './icons/material/Light.svelte'

  const themes = [
    { id: 0, theme: 'light' },
    { id: 1, theme: 'dark' },
    { id: 2, theme: 'auto' }
  ]

  let { onLightSwitch }: { onLightSwitch: (theme: string) => void } = $props()
</script>

<div class="rounded-md border border-base-content/5 p-1">
  {#each themes as t (t.id)}
    <button class={`btn ${app.theme == t.theme ? 'btn-primary' : 'btn-ghost'} btn-sm sm:btn-xs`} type="button" onclick={() => onLightSwitch(t.theme)}>
      {#if t.theme === 'light'}
        <Light class="h-4 w-4 fill-current" />
      {:else if t.theme === 'dark'}
        <Dark class="h-4 w-4 fill-current" />
      {:else}
        <Contrast class="h-4 w-4 fill-current" />
      {/if}
    </button>
  {/each}
</div>
