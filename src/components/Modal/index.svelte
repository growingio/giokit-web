<script lang="ts">
  import './index.less';
  import { fade, scale } from 'svelte/transition';
  import { Icon, Button } from '@/components';

  export let visible: boolean = false;
  export let type: 'default' | 'info' | 'warning' | 'error' = 'default';
  export let title: string = '';
  export let description: any = '';
  export let onCancel: () => void = () => {};
  export let onOk: () => void = () => {};
  export let cancelText: string = '取消';
  export let okText: string = '确定';
</script>

{#if visible}
  <div class="_gk-modal-container" transition:fade>
    <div class="_gk-modal-mask" />
    <div class={`_gk-modal _gk-modal-${type}`} transition:scale>
      <div class="_gk-modal-wrapper">
        {#if type !== 'default'}
          <div class="_gk-modal-type-icon">
            {#if type === 'info'}
              <Icon name="info" />
            {/if}
            {#if type === 'warning'}
              <Icon name="warning" />
            {/if}
            {#if type === 'error'}
              <Icon name="error" />
            {/if}
          </div>
        {/if}
        <div class="_gk-modal-content">
          {#if title}
            <div class="_gk-modal-title">
              <span>
                {title}
              </span>
            </div>
          {/if}
          {#if description}
            <div class="_gk-modal-desc">
              {description}
            </div>
          {/if}
          <slot />
        </div>
      </div>
      <div class="_gk-modal-footer">
        <Button small on:click={onCancel}>{cancelText}</Button>
        <Button small type="primary" on:click={onOk}>{okText}</Button>
      </div>
    </div>
  </div>
{/if}
