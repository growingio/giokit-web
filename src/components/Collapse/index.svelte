<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { slide } from 'svelte/transition';
  import './index.less';
  import TriangularArrow from '@/components/Icon/TriangularArrow/index.svelte';

  export let visible: boolean = true;
  export let title: string;
  export let onChange: (visible: boolean) => void = () => {};

  onMount(() => {});

  onDestroy(() => {});

  const toggle = () => {
    visible = !visible;
    onChange(visible);
  };
</script>

<div class="_gk-collapse">
  <div class="_gk-collapse-item" class:_gk-collapse-item-active={visible}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="_gk-collapse-item-head" on:click={() => toggle()}>
      <div class="_gk-collapse-item-head-icon">
        <TriangularArrow direction={visible ? 'down' : 'right'} />
      </div>
      <div class="_gk-collapse-item-head-content">
        <div class="_gk-collapse-item-head-title">{title}</div>
        <slot name="extra" />
      </div>
    </div>
    {#if visible}
      <div transition:slide|local class="_gk-collapse-item-content">
        <slot name="content" />
      </div>
    {/if}
  </div>
</div>
