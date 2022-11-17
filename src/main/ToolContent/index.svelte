<script lang="ts">
  import { onDestroy } from 'svelte';

  import { _activeTool } from '../store';
  import { commonTools, platformTools } from '../constants';
  import Log from '../../log/index.svelte';
  import System from '../../system/index.svelte';

  import './index.less';

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
</div>
