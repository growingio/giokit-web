<script lang="ts">
  import './index.less';
  import { _activeReqType } from './store';
  import ClearTip from './components/ClearTip/index.svelte';
  import Divider from '@/components/Divider/index.svelte';
  import FilterTip from './components/FilterTip/index.svelte';
  import RequestList from './components/RequestList/index.svelte';
  import Switch from '@/components/Switch/index.svelte';

  const switchers = [
    { label: 'Gio', value: 'gio' },
    { label: '全部', value: 'all' }
  ];

  const onSwitch = (k: string) => {
    _activeReqType.set(k);
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="_gk-network">
  <div class="_gk-network-header">
    <div class="_gk-network-header-title">请求概览</div>
    <div class="_gk-network-header-tools">
      {#if $_activeReqType === 'gio'}
        <FilterTip />
      {/if}
      <ClearTip />
      <Switch options={switchers} value={$_activeReqType} onChange={onSwitch} />
    </div>
  </div>
  <Divider />
  <RequestList />
</div>
