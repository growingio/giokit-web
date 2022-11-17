<script lang="ts">
  import './index.less';

  export let label = '';
</script>

<div class={`_gk-divider${label ? ' _gk-divider-labeled' : ''}`}>
  {#if label}
    <div class="_gk-divider-line-left" />
    <div class="_gk-divider-label">{label}</div>
    <div class="_gk-divider-line-right" />
  {:else}
    <div class="_gk-divider-line" />
  {/if}
</div>
