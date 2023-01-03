<script lang="ts">
  import './index.less';
  import { _clearVisible, _filterVisible, _monitorVisible } from '../../store';
  import { _showRealTimeMonitor, _openGioKit } from '@/main/store';
  import Button from '@/components/Button/index.svelte';
  import Divider from '@/components/Divider/index.svelte';
  import Icon from '@/components/Icon/index.svelte';
  import Tooltip from '@/components/Tooltip/index.svelte';

  const handleMonitor = () => {
    _filterVisible.set(false);
    _clearVisible.set(false);
    _monitorVisible.set(!$_monitorVisible);
  };

  const onMonitor = () => {
    _monitorVisible.set(false);
    _showRealTimeMonitor.set(true);
    _openGioKit.set(false);
  };
</script>

<div class="_gk-nw-tool">
  <Tooltip message="开启实时监控">
    <Button on:click={handleMonitor}>
      <Icon name="heartbeat" />
    </Button>
  </Tooltip>
</div>

<div
  id="_gk-nw-tool-minitor-tippy"
  style={`display:${$_monitorVisible ? 'block' : 'none'};`}
>
  <div class="_gk-nw-tool-tippy-arrow" />
  <div class="_gk-nw-tool-minitor-tippy-inner">
    确定要打开实时监控吗？
    <p>
      打开后GioKit会最小化，Gio事件会以弹出式消息为您展示，您可点击对应事件回到当前界面查看事件详情。
    </p>
    <p><span>提示：打开面板时会自动关闭监控；筛选事件依然生效！</span></p>
    <Divider />
    <div class="_gk-nw-tool-minitor-tippy-btns">
      <Button small on:click={() => _monitorVisible.set(false)}>取消</Button>
      <Button small type="primary" on:click={onMonitor}>确定</Button>
    </div>
  </div>
</div>
