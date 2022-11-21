<script lang="ts">
  import './index.less';
  import { _activeTool } from '../store';
  import { commonTools, platformTools } from '../constants';
  import { onDestroy } from 'svelte';
  import Log from '../../log/index.svelte';
  import Storage from '../../storage/index.svelte';
  import System from '../../system/index.svelte';

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
  {#if $_activeTool === 'system'}
    <System />
  {/if}
  {#if $_activeTool === 'storage'}
    <Storage />
  {/if}
</div>
