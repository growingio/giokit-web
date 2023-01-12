<script lang="ts">
  import { Button, Icon, Popover, Divider } from '@/components';
  import { guid } from '@/utils/tools';

  export let _visible: any;
  export let id: string = guid();
  export let message: string = '';
  export let onShow: () => void = () => {};
  export let onHide: () => void = () => {};
  export let onClear: () => void = () => {};

  let popInst: any;

  $: {
    if (!$_visible) {
      popInst?.hide();
    }
  }

  const handleClear = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    const v = $_visible;
    _visible.set(!$_visible);

    if (!v) {
      onShow();
    } else {
      onHide();
    }
  };
</script>

<div class="_gk-module-tool">
  <Popover triggerSelector={`#${id}`} bind:this={popInst}>
    <Button {id} slot="trigger" on:click={handleClear}>
      <Icon name="clear" />
    </Button>
    <div slot="popper">
      {message}
      <Divider />
      <div class="_gk-f-btns">
        <Button small on:click={() => _visible.set(false)}>取消</Button>
        <Button small type="primary" on:click={onClear}>确定</Button>
      </div>
    </div>
  </Popover>
</div>
