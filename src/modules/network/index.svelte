<script lang="ts">
  import './index.less';
  import { _clearVisible } from './store';
  import { Divider } from '@/components';
  import ClearPop from './components/ClearPop/index.svelte';
  import NormalRequestList from './components/NormalRequestList/index.svelte';

  const handleOut = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    _clearVisible.set(false);
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="_gk-nw">
  <div class="_gk-nw-header">
    <div class="_gk-ct-header">请求概览</div>
    <div class="_gk-nw-tools">
      <ClearPop reqType="all" />
    </div>
  </div>
  <Divider />
  <div class="_gk-nw-list" on:click={handleOut}>
    <NormalRequestList />
  </div>
</div>
