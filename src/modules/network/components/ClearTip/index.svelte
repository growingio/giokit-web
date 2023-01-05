<script lang="ts">
  import Popover from '@/components/Popover/index.svelte';
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
    _requestQueue,
    _monitorVisible
  } from '../../store';
  import { isEmpty } from '@/utils/glodash';
  import './index.less';

  let popInst: any;

  $: {
    if (!$_clearVisible) {
      popInst?.hide();
    }
  }

  const handleClear = () => {
    _monitorVisible.set(false);
    _filterVisible.set(false);
    _clearVisible.set(!$_clearVisible);
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

<div class="_gk-nw-tool">
  <Popover triggerSelector="#_gk-nw-tool-clear" bind:this={popInst}>
    <Button
      slot="trigger"
      id="_gk-nw-tool-clear"
      on:click={handleClear}
      disabled={($_activeReqType === 'gio' && isEmpty($_gioRequestQueue)) ||
        ($_activeReqType === 'all' && isEmpty($_requestQueue))}
    >
      <Icon name="clear" />
    </Button>
    <div slot="popper">
      确定要清空{$_activeReqType === 'gio' ? 'Gio' : '全部'}请求吗？
      <Divider />
      <div class="_gk-f-btns">
        <Button small on:click={() => _clearVisible.set(false)}>取消</Button>
        <Button small type="primary" on:click={onClear}>确定</Button>
      </div>
    </div>
  </Popover>
</div>
