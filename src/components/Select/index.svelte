<script lang="ts">
  import './index.less';
  import { slide } from 'svelte/transition';
  import Icon from '@/components/Icon/index.svelte';
  import { isEmpty } from '@/utils/glodash';

  export let defaultValue: string | number = '';
  export let options: any[] = [];

  let value: string | number = '';
  let visible: boolean = false;

  $: {
    if (defaultValue && isEmpty(value)) {
      value = defaultValue;
    }

    if (visible) {
      window.setTimeout(() => {
        document.addEventListener('click', closeDropdown);
      });
    } else {
      document.removeEventListener('click', closeDropdown);
    }
  }

  const openDropdown = () => {
    visible = true;
  };

  const closeDropdown = () => {
    visible = false;
  };

  const handleSelect = (v: string | number) => {
    value = v;
    visible = false;
  };
</script>

<div class="_gk-select">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="_gk-select-selector" on:click={openDropdown}>
    <div class="_gk-select-selector-value">
      {value}
    </div>
    <span class="_gk-select-selector-arrow">
      <Icon name="arrowLeft" />
    </span>
  </div>
  {#if visible}
    <div class="_gk-select-dropdown" transition:slide={{ duration: 200 }}>
      {#each options as item}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="_gk-select-dropdown-item"
          class:_gk-selected={value === item.value}
          on:click={() => handleSelect(item.value)}
        >
          {item.label}
        </div>
      {/each}
    </div>
  {/if}
</div>
