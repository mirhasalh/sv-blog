<script lang="ts">
  import l10n from '#l10n/l10n.ts'
  import { app } from '#lib/shared.svelte.ts'

  const onChange = (event: Event) => {
    const target = event.target as HTMLSelectElement | null
    const selected = target?.value || 'en'
    const htmlElement = document.documentElement
    htmlElement.lang = selected
    localStorage.setItem('lang', selected)
  }
</script>

<form>
  <label for="language-settings" class="hidden">Language settings</label>
  <select id="language-settings" name="language-settings" class="roboto-serif select w-18 uppercase" aria-label="Language settings" bind:value={app.locale} onchange={onChange}>
    {#each Object.keys(l10n) as lang}
      <option value={lang}>{lang}</option>
    {/each}
  </select>
</form>
