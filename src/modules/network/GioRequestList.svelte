<script lang="ts">
  import './index.less';

  export let requestQueue: any[];
  let active: string[] = [];
</script>

<div class="_gk-network-gio-list">
  <div class="_gk-network-gio-overview">
    {#each requestQueue as item, i}
      <div class="_gk-network-gio-item">
        {item.name}
      </div>
    {/each}
  </div>
  <div class="_gk-network-gio-content">ddddd</div>
</div>
