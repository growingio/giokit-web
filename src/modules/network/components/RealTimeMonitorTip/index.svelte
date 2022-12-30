<script lang="ts">
  import './index.less';
  import { _clearVisible, _filterVisible, _monitorVisible } from '../../store';
  import { _showNetworkBullet, _openGioKit } from '@/main/store';
  import Button from '@/components/Button/index.svelte';
  import Divider from '@/components/Divider/index.svelte';
  import Icon from '@/components/Icon/index.svelte';
  import Tooltip from '@/components/Tooltip/index.svelte';

  const handleMonitor = () => {
    _filterVisible.set(false);
    _clearVisible.set(false);
    _monitorVisible.set(true);
  };

  const onMonitor = () => {
    _monitorVisible.set(false);
    _showNetworkBullet.set(true);
    _openGioKit.set(false);
  };
</script>

<div class="_gk-network-header-tool">
  <Tooltip message="开启实时监控">
    <Button on:click={handleMonitor}>
      <Icon name="heartbeat" />
    </Button>
  </Tooltip>
</div>

<div
  id="_gk-network-tool-minitor-tippy"
  style={`display:${$_monitorVisible ? 'block' : 'none'};`}
>
  <div class="_gk-network-tool-tippy-arrow" />
  <div class="_gk-network-tool-minitor-tippy-inner">
    确定要打开实时监控吗？
    <p>
      打开后GioKit会最小化，Gio事件会以弹出式消息为您展示，您可点击对应事件回到当前界面查看事件详情。打开面板时会自动关闭监控。
    </p>
    <Divider />
    <div class="_gk-network-tool-minitor-tippy-btns">
      <Button small on:click={() => _monitorVisible.set(false)}>取消</Button>
      <Button small type="primary" on:click={onMonitor}>确定</Button>
    </div>
  </div>
</div>
