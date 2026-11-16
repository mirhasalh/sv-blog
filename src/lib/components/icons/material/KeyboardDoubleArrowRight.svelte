<script lang="ts">
  import type { ClassValue } from 'svelte/elements'

  const props: { class: ClassValue } = $props()
</script>

<svg class={[props.class]} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.58 12L5 7.4L6.4 6L12.4 12L6.4 18L5 16.6L9.58 12ZM16.18 12L11.6 7.4L13 6L19 12L13 18L11.6 16.6L16.18 12Z" fill="currentColor" />
</svg>
