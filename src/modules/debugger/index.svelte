<script lang="ts">
  import './index.less';
  import { _openMonitor, _clearVisible, _filterVisible } from './store';
  import { _showRealTimeMonitor, _openGioKit } from '@/main/store';
  import ClearTip from '../network/components/ClearTip/index.svelte';
  import Divider from '@/components/Divider/index.svelte';
  import FilterTip from './components/FilterTip/index.svelte';
  import GioRequestList from './components/GioRequestList/index.svelte';
  import Switch from '@/components/Switch/index.svelte';
  import Modal from '@/components/Modal/index.svelte';

  let visible: boolean = false;

  const switchers = [
    { label: '开启', value: 'open' },
    { label: '关闭', value: 'close' }
  ];

  const onSwitch = (k: string) => {
    _openMonitor.set(k === 'open');
    if (k === 'open') {
      visible = true;
    } else {
      _showRealTimeMonitor.set(false);
    }
  };

  const handleOut = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    _clearVisible.set(false);
    _filterVisible.set(false);
  };

  const onCancel = () => {
    visible = false;
    _openMonitor.set(false);
  };

  const onOpenMonitor = () => {
    visible = false;
    _showRealTimeMonitor.set(true);
    _openGioKit.set(false);
  };
</script>

<div class="_gk-debug">
  <div class="_gk-debug-header">
    <div class="_gk-ct-header">事件调试</div>
    <div class="_gk-debug-tools">
      <div class="_gk-debug-tool-monitor">
        实时监控：
        <Switch
          options={switchers}
          value={$_openMonitor ? 'open' : 'close'}
          onChange={onSwitch}
        />
      </div>
      <FilterTip />
      <ClearTip reqType="gio" />
    </div>
  </div>
  <Divider />
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="_gk-debug-list" on:click={handleOut}>
    <GioRequestList />
  </div>
  <Modal
    {visible}
    type="info"
    title="确定打开实时监控吗？"
    description="打开后面板会最小化，Gio事件会以弹出式消息为您展示，您可点击对应事件回到当前界面查看事件详情。"
    {onCancel}
    onOk={onOpenMonitor}
  />
</div>
