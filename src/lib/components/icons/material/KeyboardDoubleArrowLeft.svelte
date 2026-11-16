<script lang="ts">
  import type { ClassValue } from 'svelte/elements'

  const props: { class: ClassValue } = $props()
</script>

<svg class={[props.class]} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11 18L5 12L11 6L12.4 7.4L7.83 12L12.41 16.6L11 18ZM17.6 18L11.6 12L17.6 6L19 7.4L14.43 12L19 16.6L17.6 18Z" fill="currentColor" />
</svg>
