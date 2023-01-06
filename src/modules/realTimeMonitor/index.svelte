<script lang="ts">
  import './index.less';
  import { _appearedIds } from './store';
  import {
    _gioRequestQueue,
    _gioActive,
    _gioActiveEvent
  } from '../debugger/store';
  import { _openGioKit, _showRealTimeMonitor } from '@/main/store';
  import { fly } from 'svelte/transition';
  import { isEmpty, head } from '@/utils/glodash';
  import { onDestroy, onMount } from 'svelte';
  import { Unsubscriber } from 'svelte/store';

  let monitorList: any[] = [];
  let unsubscribe: Unsubscriber;

  onMount(() => {
    unsubscribe = _gioRequestQueue.subscribe((q: any) => {
      if (!isEmpty(q)) {
        const target = head(q);
        if (!$_appearedIds.includes(target._id)) {
          _appearedIds.update((l) => [...l, target._id]);
          monitorList = [...monitorList, target];
          window.setTimeout(() => {
            monitorList = monitorList.filter((o) => o._id !== target._id);
          }, 2000);
        }
      }
    });
  });

  onDestroy(() => {
    unsubscribe();
  });

  const onSelect = (item: any) => {
    _gioActive.set(item._id);
    _gioActiveEvent.set(item);
    _showRealTimeMonitor.set(false);
    _openGioKit.set(true);
  };
</script>

{#if $_showRealTimeMonitor}
  <div class="_gk-realtime-monitor">
    {#each monitorList as item}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        transition:fly={{ x: 80, duration: 400 }}
        class="_gk-realtime-monitor-item"
        on:click={() => onSelect(item)}
      >
        <div class="_gk-item-idx">
          {item?.gioEventGsid}
        </div>
        <div class="_gk-item-content">
          <div class="_gk-item-content-type">
            {item?.gioEventType}
          </div>
          {#if item.gioEventName}
            <div class="_gk-item-content-preview">
              {item?.gioEventName}
            </div>
          {:else if item.gioPreviewXpath}
            <div class="_gk-item-content-preview">
              {item?.gioPreviewXpath}
            </div>
          {:else}
            <div class="_gk-item-content-preview">
              {item?.gioPreviewPath}
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
{/if}
