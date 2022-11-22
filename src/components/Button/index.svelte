<script lang="ts">
  import { isBoolean } from 'glodash';
  import './index.less';

  /**
   * Public properties
   */
  export let type: 'primary' | 'default' | 'link' | 'text' | 'dashed' =
    'default';
  export let disabled: boolean = false;
  export let loading: boolean = false;
  export let small: boolean = false;
  export let className: string = '';

  /**
   * Inner properties
   */
  $: {
    if (!['primary', 'default', 'link', 'text', 'dashed'].includes(type)) {
      type = 'default';
    }
    if (!isBoolean(disabled)) {
      disabled = !!disabled;
    }
    if (!isBoolean(loading)) {
      loading = !!loading;
    }
    if (!isBoolean(small)) {
      small = !!small;
    }
  }
</script>

<button
  {...$$props}
  class={`_gk-btn _gk-btn-${type}${disabled ? ' _gk-btn-disabled' : ''}${
    small ? ' _gk-btn-small' : ''
  } ${className}`}
  on:click
>
  <slot />
</button>
