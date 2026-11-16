<script lang="ts">
  let { isOpenToWork = false }: { isOpenToWork: boolean } = $props()
</script>

{#if isOpenToWork}
  <div class="indicator">
    <span class="indicator-item status animate-ping status-success"></span>
    <div class="indicator-item status status-success"></div>
    <div class="roboto-serif tooltip tooltip-left tooltip-success" data-tip="Open to work">
      <a class="btn btn-circle overflow-clip btn-ghost" href="https://github.com/mirhasalh" target="_blank" rel="noopener noreferrer" aria-describedby="open-in-new-tab" title="Go to mirhasalh GitHub">
        <img src="/load/image?url=https://github.com/mirhasalh.png" width="40" height="40" alt="GitHub mirhasalh" />
      </a>
    </div>
  </div>
{:else}
  <a class="btn btn-circle overflow-clip btn-ghost" href="https://github.com/mirhasalh" target="_blank" rel="noopener noreferrer" aria-describedby="open-in-new-tab" title="Go to mirhasalh GitHub">
    <img src="/load/image?url=https://github.com/mirhasalh.png" width="40" height="40" alt="GitHub mirhasalh" />
  </a>
{/if}
