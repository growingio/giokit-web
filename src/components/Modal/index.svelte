<script lang="ts">
  import './index.less';
  import { fade, scale } from 'svelte/transition';
  import Icon from '@/components/Icon/index.svelte';
  import Button from '@/components/Button/index.svelte';

  export let visible: boolean = false;
  export let type: 'default' | 'info' | 'warning' | 'error' = 'default';
  export let title: string = '';
  export let onCancel: () => void = () => {};
  export let onOk: () => void = () => {};
  export let cancelText: string = '取消';
  export let okText: string = '确定';
</script>

{#if visible}
  <div class="_gk-modal-container" transition:fade>
    <div class="_gk-modal-mask" />
    <div class={`_gk-modal _gk-modal-${type}`} transition:scale>
      <div class="_gk-modal-title">
        {#if type === 'info'}
          <Icon name="info" />
        {/if}
        {#if type === 'warning'}
          <Icon name="warning" />
        {/if}
        {#if type === 'error'}
          <Icon name="error" />
        {/if}
        <span>
          {title}
        </span>
      </div>
      <div class="_gk-modal-footer">
        <Button small on:click={onCancel}>{cancelText}</Button>
        <Button small type="primary" on:click={onOk}>{okText}</Button>
      </div>
    </div>
  </div>
{/if}
