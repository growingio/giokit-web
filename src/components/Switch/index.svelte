<script lang="ts">
  import { head, isEmpty } from '@/utils/glodash';
  import './index.less';

  export let options: any[];
  export let value: string | number;
  export let onChange: (value) => void = () => {};

  let active: string | number = '';

  $: {
    if (value) {
      active = value;
    } else if (!active && !isEmpty(options)) {
      active = head(options).value;
    }
  }

  const handleChange = (value: string | number) => {
    active = value;
    onChange(value);
  };
</script>

<div class="_gk-switch">
  {#each options as item}
    <button
      class="_gk-switch-item"
      class:_gk-switch-active={active === item.value}
      on:click={() => handleChange(item.value)}>{item.label}</button
    >
  {/each}
</div>
