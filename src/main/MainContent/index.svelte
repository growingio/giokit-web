<script lang="ts">
  import './index.less';
  import { _activeTool } from '../store';
  import { commonTools, platformTools } from '@/constants/constants';
  import Icon from '@/components/Icon/index.svelte';

  /**
   * Methods
   */
  const onHandleTap = (activeKey: string) => {
    _activeTool.set(activeKey);
  };
</script>

<div class="_gk-panel-paragraph">
  <div class="_gk-panel-paragraph-title">
    <div class="_gk-content-header">常用工具</div>
  </div>
  <div class="_gk-panel-paragraph-content">
    {#each commonTools as item}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="_gk-panel-paragraph-items"
        on:click={() => onHandleTap(item.key)}
      >
        <div><Icon name={item.icon} /></div>
        <div>{item.label}</div>
      </div>
    {/each}
  </div>
</div>
<div class="_gk-panel-paragraph">
  <div class="_gk-panel-paragraph-title">
    <div class="_gk-content-header">平台工具</div>
  </div>
  <div class="_gk-panel-paragraph-content">
    {#each platformTools as item}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="_gk-panel-paragraph-items"
        on:click={() => onHandleTap(item.key)}
      >
        <div><Icon name={item.icon} /></div>
        <div>{item.label}</div>
      </div>
    {/each}
  </div>
</div>
