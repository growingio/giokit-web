<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import './index.less';

  onMount(() => {});

  onDestroy(() => {});

  export let checked: boolean = false;
  export let indeterminate: boolean = false;
  export let className: string = '';
  let type: string = '';

  const dispatch = createEventDispatcher();
  const change = (event: any) => {
    checked = event.target?.checked;
    dispatch('change', { checked });
  };

  $: {
    if (indeterminate) {
      type = '_gk-indeterminate';
    } else if (checked) {
      type = '_gk-checked';
    } else {
      type = '';
    }
  }
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class={`_gk-checkbox ${className ? ` ${className}` : ''}`}>
  <span class={`_gk-checkbox-wrapper${type ? ` ${type}` : ''}`}>
    <input type="checkbox" on:change={change} {checked} />
    <span class="_gk-checkbox-inner" />
  </span>
  <span class="_gk-checkbox-text">
    <slot />
  </span>
</label>
