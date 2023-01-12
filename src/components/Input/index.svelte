<script lang="ts">
  import { isNil } from '@/utils/glodash';
  import './index.less';

  export let value: string = '';
  export let placeholder: string = '';
  export let disabled: boolean = false;
  export let errorMsg: string = '';

  $: {
    if (isNil(value)) {
      value = '';
    }
  }
</script>

<div class="_gk-input">
  <input
    {placeholder}
    {disabled}
    {value}
    class:_gk-input-disabled={disabled}
    class:_gk-input-has-error={errorMsg}
    on:input
    on:change
    on:keydown
  />
  {#if errorMsg}
    <div class="_gk-input-error">{errorMsg}</div>
  {/if}
</div>
