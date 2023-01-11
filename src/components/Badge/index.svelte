<script lang="ts">
  import './index.less';

  export let dot: boolean = false;
</script>

<span class="_gk-badge">
  <slot />
  {#if dot}
    <sup class="_gk-badge-dot" />
  {/if}
</span>
