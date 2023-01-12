<script lang="ts">
  import './index.less';
  import {
    _handledIdx,
    _storageList,
    _handleType,
    _activeStorage
  } from '../../store';
  import { Icon, Popover } from '@/components';
  import CopyTool from '../CopyTool/index.svelte';

  export let idx: number;

  let popInst: any;

  $: {
    if ($_handledIdx !== idx) {
      popInst?.hide();
    }
  }

  const handleTools = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    if ($_handledIdx === idx) {
      _handledIdx.set(-1);
      _handleType.set('');
    } else {
      _handledIdx.set(idx);
    }
  };

  const handleTypes = (t: string, e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    _handleType.set(t);
  };
</script>

<Popover
  bind:this={popInst}
  triggerSelector={`#_gk-strg-item-${$_activeStorage}-${idx}`}
  placement="left"
  poperWidth="auto"
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <span
    slot="trigger"
    id={`_gk-strg-item-${$_activeStorage}-${idx}`}
    on:click={handleTools}
    on:keypress
  >
    <Icon name="more" />
  </span>
  <div slot="popper" class="_gk-strg-item-tools">
    <CopyTool />
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span
      class="_gk-strg-item-tool"
      title="编辑"
      on:click={(e) => handleTypes('edit', e)}
    >
      <Icon name="edit" />
    </span>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span
      class="_gk-strg-item-tool"
      title="删除"
      on:click={(e) => handleTypes('delete', e)}
    >
      <Icon name="delete" />
    </span>
  </div>
</Popover>
