<script lang="ts">
  import type { ClassValue } from 'svelte/elements'

  const props: { class: ClassValue } = $props()
</script>

<svg class={[props.class]} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11 4V16.18L5.4 10.58L4 12L12 20L20 12L18.6 10.57L13 16.18V4H11Z" fill="currentColor" />
</svg>
