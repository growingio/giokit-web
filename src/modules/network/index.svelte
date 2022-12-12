<script lang="ts">
  import './index.less';
  import { _activeReqType } from './store';
  import Divider from '@/components/Divider/index.svelte';
  import RequestList from './RequestList.svelte';
  import Switch from '@/components/Switch/index.svelte';
  import ClearTip from './ClearTip.svelte';
  import FilterTip from './FilterTip.svelte';

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
