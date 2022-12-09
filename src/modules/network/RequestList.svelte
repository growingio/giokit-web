<script lang="ts">
  import './index.less';
  import { _activeReqType, _requestQueue } from './store';
  import { get, Unsubscriber } from 'svelte/store';
  import { onMount, onDestroy } from 'svelte';
  import NormalRequestList from './NormalRequestList.svelte';
  import GioRequestList from './GioRequestList.svelte';

  let active: string[] = [];
  let unsubscribe_activeReqType: Unsubscriber;
  let unsubscribe_requestQueue: Unsubscriber;
  let requestQueue: any[] = [];

  onMount(() => {
    // 筛选类型切换监听
    unsubscribe_activeReqType = _activeReqType.subscribe((v) => {
      active = [];
      if (v === 'gio') {
        requestQueue = get(_requestQueue).filter((o: any) => o.isGioData);
      } else {
        requestQueue = get(_requestQueue);
      }
    });
    // 列表变动监听
    unsubscribe_requestQueue = _requestQueue.subscribe((l) => {
      if (get(_activeReqType) === 'gio') {
        requestQueue = l.filter((o: any) => o.isGioData);
      } else {
        requestQueue = l;
      }
    });
  });

  onDestroy(() => {
    unsubscribe_activeReqType();
    unsubscribe_requestQueue();
  });
</script>

<div class="_gk-network-list">
  {#if $_activeReqType === 'gio'}
    <GioRequestList {requestQueue} />
  {:else}
    <NormalRequestList {requestQueue} />
  {/if}
</div>
