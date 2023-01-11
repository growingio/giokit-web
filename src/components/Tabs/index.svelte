<script lang="ts">
  import { head, isEmpty } from '@/utils/glodash';
  import { Icon } from '@/components';

  import './index.less';

  /**
   * Public properties
   */
  export let defaultActive: string = '';
  export let items: any[] = [];
  export let onChange: (active: string) => void = () => {};

  /**
   *  Inner properties
   */
  let active: string = '';

  $: {
    if (defaultActive && !active) {
      active = defaultActive;
    }
    if (!isEmpty(items) && !active) {
      const defaultTarget = head(items);
      if (!isEmpty(defaultTarget) && defaultTarget.key) {
        active = defaultTarget.key;
      }
    }
  }

  /**
   * Methods
   */

  const handleChange = (key: string) => {
    active = key;
    onChange(key);
  };
</script>

<div class="_gk-tabs">
  <div class="_gk-tabs-nav">
    {#each items as item}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class={`_gk-tabs-tab${
          active === item.key ? ' _gk-tabs-tab-active' : ''
        }`}
        on:click={() => handleChange(item.key)}
      >
        <div class="_gk-tabs-tab-content">
          {#if item.icon}
            <Icon name={item.icon} />
          {/if}
          {item.label}
        </div>
      </div>
    {/each}
  </div>
</div>
