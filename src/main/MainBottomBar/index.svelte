<script lang="ts">
  import './index.less';

  export let items: any[] = [];
</script>

<div class="_gk-main-bottom-bar">
  {#each items as item}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="_gk-main-bottom-bar-item"
      on:click={() => item.onClick(item.key)}
    >
      {item.label}
    </div>
  {/each}
</div>
