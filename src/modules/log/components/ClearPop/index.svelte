<script lang="ts">
  import { Button, Icon, Popover, Divider } from '@/components';
  import { _logQueue, _clearVisible } from '../../store';

  let popInst: any;

  $: {
    if (!$_clearVisible) {
      popInst?.hide();
    }
  }

  const handleClear = () => {
    _clearVisible.set(!$_clearVisible);
  };

  const onClear = () => {
    _clearVisible.set(false);
    _logQueue.set([]);
  };
</script>

<div class="_gk-log-tool">
  <Popover triggerSelector="#_gk-log-tool-clear" bind:this={popInst}>
    <Button id="_gk-log-tool-clear" slot="trigger" on:click={handleClear}>
      <Icon name="clear" />
    </Button>
    <div slot="popper">
      确定要清空全部日志吗？
      <Divider />
      <div class="_gk-f-btns">
        <Button small on:click={() => _clearVisible.set(false)}>取消</Button>
        <Button small type="primary" on:click={onClear}>确定</Button>
      </div>
    </div>
  </Popover>
</div>
