<script lang="ts">
  import { page } from '$app/state'
</script>

<div class="hero min-h-screen">
  <div class="relative hero-content z-10 text-center">
    <div class="max-w-md">
      <h1 class="merriweather text-5xl font-bold">{page.status}</h1>
      <p class="roboto-serif py-6">
        {`${page.error?.message[0]}${page.error?.message.substring(1).toLowerCase()}`}
      </p>
    </div>
  </div>
</div>
