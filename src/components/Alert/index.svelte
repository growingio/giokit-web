<script lang="ts">
  import './index.less';
  import { slide } from 'svelte/transition';
  import Icon from '@/components/Icon/index.svelte';

  export let message: string = '';
  export let description: string = '';
  export let closeable: boolean = false;
  export let showIcon: boolean = false;
  export let type: 'info' | 'success' | 'warning' | 'error' = 'info';
  export let onClose: () => void = () => {};
</script>

<div class={`_gk-alert _gk-alert-${type}`} transition:slide|local>
  {#if showIcon}
    <div class="_gk-alert-icon">
      <Icon name={type} />
    </div>
  {/if}
  <div class="_gk-alert-content">
    <div class="_gk-alert-message">{message}</div>
    {#if description}
      <div class="_gk-alert-desc">{description}</div>
    {/if}
  </div>
  {#if closeable}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span class="_gk-alert-close" on:click={onClose}>
      <Icon name="close" />
    </span>
  {/if}
</div>
