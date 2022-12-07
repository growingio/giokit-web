<script lang="ts">
  import './index.less';
  import { _activeReqType } from './store';
  import Divider from '@/components/Divider/index.svelte';
  import RequestList from './RequestList.svelte';
  import Switch from '@/components/Switch/index.svelte';

  const switchers = [
    { label: 'Gio', value: 'gio' },
    { label: '全部', value: 'all' }
  ];

  const onSwitch = (k: string) => {
    _activeReqType.set(k);
  };
</script>

<div class="_gk-network">
  <div class="_gk-network-header">
    <div class="_gk-network-header-title">请求概览</div>
    <div class="_gk-network-header-tools">
      <Switch options={switchers} value={$_activeReqType} onChange={onSwitch} />
    </div>
  </div>
  <Divider />
  <RequestList />
</div>
