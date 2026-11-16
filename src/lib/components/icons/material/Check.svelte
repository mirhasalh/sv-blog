<script lang="ts">
  import type { ClassValue } from 'svelte/elements'

  const props: { class: ClassValue } = $props()
</script>

<svg class={[props.class]} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.54998 18L3.84998 12.3L5.27998 10.88L9.55998 15.16L18.74 5.97998L20.15 7.39998L9.54998 18Z" fill="currentColor" />
</svg>
