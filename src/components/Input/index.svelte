<script lang="ts">
  import { isNil } from '@/utils/glodash';
  import './index.less';

  export let defaultValue: string = '';
  export let placeholder: string = '';
  export let disabled: boolean = false;
  export let errorMsg: string = '';

  $: {
    if (isNil(defaultValue)) {
      defaultValue = '';
    }
  }
</script>

<div class="_gk-input">
  <input
    {placeholder}
    {disabled}
    class:_gk-input-disabled={disabled}
    class:_gk-input-has-error={errorMsg}
    value={defaultValue}
    on:input
    on:change
  />
  {#if errorMsg}
    <div class="_gk-input-error">{errorMsg}</div>
  {/if}
</div>
