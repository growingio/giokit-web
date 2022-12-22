<script lang="ts">
  import './index.less';
  import { _activeTool } from '../store';
  import { commonTools, platformTools } from '@/constants/constants';
  import { onDestroy } from 'svelte';
  import Log from '../../modules/log/index.svelte';
  import Storage from '../../modules/storage/index.svelte';
  import System from '../../modules/system/index.svelte';
  import Network from '../../modules/network/index.svelte';
  import QuickInit from '../../modules/quickInit/index.svelte';
  import InitVerification from '../../modules/initVerification/index.svelte';
  import EventExecution from '../../modules/eventExecution/index.svelte';
  import RunningState from '../../modules/runningState/index.svelte';
  import RunningStatistics from '../../modules/runningStatistics/index.svelte';

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
  {#if $_activeTool === 'quick-init'}
    <QuickInit />
  {/if}
  {#if $_activeTool === 'init-verification'}
    <InitVerification />
  {/if}
  {#if $_activeTool === 'event-execution'}
    <EventExecution />
  {/if}
  {#if $_activeTool === 'running-state'}
    <RunningState />
  {/if}
  {#if $_activeTool === 'running-statistics'}
    <RunningStatistics />
  {/if}
</div>
