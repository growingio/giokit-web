<script lang="ts">
  import './index.less';
  import { Icon } from '@/components';

  export let items: any[] = [];
  export let current: number = 2;
</script>

<div class="_gk-steps">
  {#each items as item, i}
    <div
      class="_gk-steps-item"
      class:_gk-steps-item-active={current === i}
      class:_gk-steps-item-finished={current > i}
    >
      {#if current > i}
        <Icon name="check" />
      {/if}
      {i + 1}. {item}
    </div>
  {/each}
</div>
