<script lang="ts">
  import Button from '@/components/Button/index.svelte';
  import Icon from '@/components/Icon/index.svelte';
  import Divider from '@/components//Divider/index.svelte';
  import {
    _activeReqType,
    _clearVisible,
    _filterVisible,
    _gioActive,
    _gioActiveEvent,
    _gioRequestQueue,
    _requestQueue
  } from '../../store';
  import './index.less';
  import { isEmpty } from '@/utils/glodash';

  const handleClear = () => {
    _filterVisible.set(false);
    _clearVisible.set(true);
  };

  const onClear = () => {
    _clearVisible.set(false);
    if ($_activeReqType === 'all') {
      _requestQueue.set([]);
    }
    _gioActive.set('');
    _gioActiveEvent.set(undefined);
    _gioRequestQueue.set([]);
  };
</script>

<div class="_gk-network-header-tool">
  <Button
    on:click={handleClear}
    disabled={($_activeReqType === 'gio' && isEmpty($_gioRequestQueue)) ||
      ($_activeReqType === 'all' && isEmpty($_requestQueue))}
  >
    <Icon name="clear" />
  </Button>
</div>

<div
  id="_gk-network-tool-clear-tippy"
  style={`display:${$_clearVisible ? 'block' : 'none'};`}
>
  <div class="_gk-network-tool-tippy-arrow" />
  <div class="_gk-network-tool-clear-tippy-inner">
    确定要清空{$_activeReqType === 'gio' ? 'Gio' : '全部'}请求吗？
    <Divider />
    <div class="_gk-network-tool-clear-tippy-btns">
      <Button small on:click={() => _clearVisible.set(false)}>取消</Button>
      <Button small type="primary" on:click={onClear}>确定</Button>
    </div>
  </div>
</div>
