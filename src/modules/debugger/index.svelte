<script lang="ts">
  import './index.less';
  import {
    _clearVisible,
    _filterVisible,
    _gioActive,
    _gioActiveEvent,
    _gioRequestQueue,
    _openMonitor
  } from './store';
  import { _showRealTimeMonitor, _openGioKit } from '@/main/store';
  import { Divider, Toggle, Modal } from '@/components';
  import ClearPop from '@/components/ClearPop/index.svelte';
  import FilterPop from './components/FilterPop/index.svelte';
  import GioRequestList from './components/GioRequestList/index.svelte';

  let visible: boolean = false;

  const onSwitch = (_: any, v: boolean) => {
    _openMonitor.set(v);
    if (v) {
      visible = true;
    } else {
      _showRealTimeMonitor.set(false);
    }
  };

  const handleOut = (e?: Event) => {
    e?.preventDefault();
    e?.stopPropagation();
    _clearVisible.set(false);
    _filterVisible.set(false);
  };

  const onClear = () => {
    _gioActive.set('');
    _gioActiveEvent.set(undefined);
    _gioRequestQueue.set([]);
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
        <Toggle checked={$_openMonitor} onChange={onSwitch} />
      </div>
      <FilterPop />
      <ClearPop
        id="_gk-debug-tool-clear"
        message="确定清空所有Gio请求吗？"
        _visible={_clearVisible}
        onShow={() => _filterVisible.set(false)}
        onHide={handleOut}
        {onClear}
      />
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
    description="打开后面板会最小化，Gio事件会以弹出式消息为您展示，您可点击对应事件回到当前界面查看事件详情。重定向或刷新页面等导致重新加载的操作时，请重新开启。"
    {onCancel}
    onOk={onOpenMonitor}
  />
</div>
