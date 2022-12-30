<script lang="ts">
  import '../../index.less';
  import {
    _gioActive,
    _gioActiveEvent,
    _gioRequestQueue,
    _activeReqType,
    _filterActive
  } from '../../store';
  import { formatTime, isEmpty } from '@/utils/glodash';
  import { onMount, onDestroy } from 'svelte';
  import { RequestItem } from '../../model';
  import { Unsubscriber, get } from 'svelte/store';
  import Duration from '../Duration/index.svelte';
  import Empty from '@/components/Empty/index.svelte';
  import JsonView from '@/components/JsonView/index.svelte';

  let requestQueue: any[];
  let unsubscribe_requestQueue: Unsubscriber;
  let unsubscribe_filterActive: Unsubscriber;

  onMount(() => {
    // 列表变动监听
    unsubscribe_requestQueue = _gioRequestQueue.subscribe((l) => {
      requestQueue = l.filter((o: any) =>
        get(_filterActive).includes(o.gioEventType)
      );
    });
    // Gio事件筛选监听
    unsubscribe_filterActive = _filterActive.subscribe((tps) => {
      requestQueue = get(_gioRequestQueue).filter((o: any) =>
        tps.includes(o.gioEventType)
      );
    });
  });

  onDestroy(() => {
    unsubscribe_requestQueue();
    unsubscribe_filterActive();
  });

  const onSelect = (id: string) => {
    _gioActive.set(id);
    const activeEvent = requestQueue.find((o) => o._id === id);
    _gioActiveEvent.set(activeEvent as RequestItem);
  };
</script>

<div class="_gk-network-gio-list">
  {#if !isEmpty(requestQueue)}
    <div class="_gk-network-gio-overview">
      {#each requestQueue as item}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="_gk-network-gio-item"
          class:_gk-network-gio-item-active={$_gioActive === item._id}
          on:click={() => onSelect(item._id)}
        >
          <div>
            <span class="_gk-network-gio-item-type">{item.gioEventType}</span>
            <Duration {item} />
          </div>
          <p>
            {formatTime(new Date(item.startTime))}
            <span>{item.gioEventGsid}</span>
          </p>
        </div>
      {/each}
    </div>
    <div class="_gk-network-gio-content">
      {#if !isEmpty($_gioActiveEvent)}
        <div class="_gk-network-gio-content-wrapper">
          <div class="_gk-network-gio-content-title">
            请求地址：{$_gioActiveEvent?.url}
          </div>
          <JsonView data={$_gioActiveEvent?.body} />
        </div>
      {:else}
        <div class="_gk-network-gio-empty">
          <Empty title="请选择事件查看请求数据" />
        </div>
      {/if}
    </div>
  {:else}
    <div class="_gk-network-gio-empty">
      <Empty />
    </div>
  {/if}
</div>
