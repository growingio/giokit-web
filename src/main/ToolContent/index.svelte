<script lang="ts">
  import './index.less';
  import { _activeTool } from '../store';
  import { commonTools, platformTools } from '../constants';
  import { onDestroy } from 'svelte';
  import Log from '../../modules/log/index.svelte';
  import Storage from '../../modules/storage/index.svelte';
  import System from '../../modules/system/index.svelte';
  import Network from '../../modules/network/index.svelte';

  /**
   * Inner properties
   */
  let toolInfo;

  const unsubscribe = _activeTool.subscribe((acKey: string) => {
    toolInfo = [...commonTools, ...platformTools].find(
      (o: any) => o.key == acKey
    );
  });

  /**
   * Lifecycle
   */
  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class="_gk-content">
  {#if $_activeTool === 'log'}
    <Log />
  {/if}
  {#if $_activeTool === 'network'}
    <Network />
  {/if}
  {#if $_activeTool === 'system'}
    <System />
  {/if}
  {#if $_activeTool === 'storage'}
    <Storage />
  {/if}
</div>
