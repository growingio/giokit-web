<script lang="ts">
  import './index.less';
  import {
    _gioRequestQueue,
    _gioActive,
    _activeReqType,
    _gioActiveEvent
  } from './store';
  import { RequestItem } from './model';
  import { get } from 'svelte/store';
  import { formatTime, isEmpty } from '@/utils/glodash';
  import Empty from '@/components/Empty/index.svelte';
  import JsonView from '@/components/JsonView/index.svelte';

  export let requestQueue: any[];

  const onSelect = (id: string) => {
    _gioActive.set(id);
    const activeEvent = get(_gioRequestQueue).find((o) => o._id === id);
    _gioActiveEvent.set(activeEvent as RequestItem);
  };
</script>

<div class="_gk-network-gio-list">
  {#if !isEmpty($_gioRequestQueue)}
    <div class="_gk-network-gio-overview">
      {#each $_gioRequestQueue as item}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="_gk-network-gio-item"
          class:_gk-network-gio-item-active={$_gioActive === item._id}
          on:click={() => onSelect(item._id)}
        >
          <p>
            {item.gioType}
          </p>
          <p>
            {formatTime(new Date(item.startTime))}
          </p>
        </div>
      {/each}
    </div>
    <div class="_gk-network-gio-content">
      {#if !isEmpty($_gioActiveEvent)}
        <div class="_gk-network-gio-content-wrapper">
          <div class="_gk-network-gio-content-title">
            请求地址：{$_gioActiveEvent.url}
          </div>
          <JsonView data={$_gioActiveEvent.body} />
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
