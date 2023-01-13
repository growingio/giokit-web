<script lang="ts">
  import './index.less';
  import { _clearVisible, _requestQueue } from './store';
  import { Divider } from '@/components';
  import ClearPop from '@/components/ClearPop/index.svelte';
  import NormalRequestList from './components/NormalRequestList/index.svelte';

  const handleOut = (e?: Event) => {
    e?.preventDefault();
    e?.stopPropagation();
    _clearVisible.set(false);
  };

  const onClear = () => {
    _requestQueue.set([]);
    handleOut();
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="_gk-nw">
  <div class="_gk-nw-header">
    <div class="_gk-ct-header">请求概览</div>
    <div class="_gk-nw-tools">
      <ClearPop
        id="_gk-nw-tool-clear"
        message="确定清空所有请求吗？"
        _visible={_clearVisible}
        onHide={handleOut}
        {onClear}
      />
    </div>
  </div>
  <Divider />
  <div class="_gk-nw-list" on:click={handleOut}>
    <NormalRequestList />
  </div>
</div>
