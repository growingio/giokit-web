<script lang="ts">
  import '../../index.less';
  import {
    _activeReqType,
    _clearVisible,
    _filterVisible,
    _requestQueue,
    _gioRequestQueue,
    _filterActive
  } from '../../store';
  import NormalRequestList from '../NormalRequestList/index.svelte';
  import GioRequestList from '../GioRequestList/index.svelte';

  const handleOut = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    _clearVisible.set(false);
    _filterVisible.set(false);
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="_gk-nw-list" on:click={handleOut}>
  {#if $_activeReqType === 'gio'}
    <GioRequestList />
  {:else}
    <NormalRequestList />
  {/if}
</div>
