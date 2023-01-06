<script lang="ts">
  import './index.less';
  import { _clearVisible, _requestQueue } from '../../store';
  import { isEmpty } from '@/utils/glodash';
  import {
    _gioActive,
    _gioActiveEvent,
    _gioRequestQueue,
    _filterVisible
  } from '../../../debugger/store';
  import Button from '@/components/Button/index.svelte';
  import Divider from '@/components//Divider/index.svelte';
  import Icon from '@/components/Icon/index.svelte';
  import Popover from '@/components/Popover/index.svelte';

  export let reqType: string = 'all';

  let popInst: any;

  $: {
    if (!$_clearVisible) {
      popInst?.hide();
    }
  }

  const handleClear = () => {
    _filterVisible.set(false);
    _clearVisible.set(!$_clearVisible);
  };

  const onClear = () => {
    _clearVisible.set(false);
    if (reqType === 'all') {
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
      disabled={(reqType === 'gio' && isEmpty($_gioRequestQueue)) ||
        (reqType === 'all' && isEmpty($_requestQueue))}
    >
      <Icon name="clear" />
    </Button>
    <div slot="popper">
      确定要清空{reqType === 'gio' ? 'Gio' : '全部'}请求吗？
      <Divider />
      <div class="_gk-f-btns">
        <Button small on:click={() => _clearVisible.set(false)}>取消</Button>
        <Button small type="primary" on:click={onClear}>确定</Button>
      </div>
    </div>
  </Popover>
</div>
