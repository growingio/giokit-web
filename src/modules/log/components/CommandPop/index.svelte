<script lang="ts">
  import { Button, Divider, Icon, Popover, TextArea } from '@/components';
  import { _commandVisble } from '../../store';
  import LogsModel from '../../model';
  import './index.less';

  let popInst: any;
  let cdmValue: string;

  $: {
    if (!$_commandVisble) {
      popInst?.hide();
    }
  }

  const handleCommand = () => {
    _commandVisble.set(!$_commandVisble);
  };

  const onInputChange = (e: any) => {
    cdmValue = e.target?.value ?? '';
  };

  const onKeyDown = (e: any) => {
    // 回车
    if (e.keyCode == 13 && e.key === 'Enter') {
      onCommand();
    }
  };

  const onCommand = () => {
    if (cdmValue) {
      const module = LogsModel.getSingleton();
      module.evalCommand(cdmValue);
      cdmValue = '';
      _commandVisble.set(false);
    }
  };
</script>

<div class="_gk-log-tool">
  <Popover triggerSelector="#_gk-log-tool-cmd" bind:this={popInst}>
    <Button slot="trigger" id="_gk-log-tool-cmd" on:click={handleCommand}>
      <Icon name="code" />
    </Button>
    <div slot="popper" class="_gk-log-tool-cmd-pop">
      <TextArea
        placeholder="请输入执行代码..."
        value={cdmValue}
        on:input={onInputChange}
        on:change={onInputChange}
        on:keydown={onKeyDown}
      />
      {#if cdmValue}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span class="_gk-log-tool-cmd-clear" on:click={() => (cdmValue = '')}>
          <Icon name="close" />
        </span>
      {/if}
      <Divider />
      <div class="_gk-f-btns">
        <Button small on:click={() => _commandVisble.set(false)}>取消</Button>
        <Button small type="primary" on:click={onCommand}>执行</Button>
      </div>
    </div>
  </Popover>
</div>
