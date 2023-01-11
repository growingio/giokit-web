<script lang="ts">
  import './index.less';
  import { _activeTool } from '../store';
  import { commonTools, platformTools } from '@/constants/constants';
  import { Icon } from '@/components';

  /**
   * Methods
   */
  const onHandleTap = (activeKey: string) => {
    _activeTool.set(activeKey);
  };
</script>

<div class="_gk-block">
  <div class="_gk-block-title">
    <div class="_gk-ct-header">常用工具</div>
  </div>
  <div class="_gk-block-content">
    {#each commonTools as item}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="_gk-block-items" on:click={() => onHandleTap(item.key)}>
        <div><Icon name={item.icon} /></div>
        <div>{item.label}</div>
      </div>
    {/each}
  </div>
</div>
<div class="_gk-block">
  <div class="_gk-block-title">
    <div class="_gk-ct-header">平台工具</div>
  </div>
  <div class="_gk-block-content">
    {#each platformTools as item}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="_gk-block-items" on:click={() => onHandleTap(item.key)}>
        <div><Icon name={item.icon} /></div>
        <div>{item.label}</div>
      </div>
    {/each}
  </div>
</div>
