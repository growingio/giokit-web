<script lang="ts">
  import { isNil } from '@/utils/glodash';
  import './index.less';

  export let defaultValue: string = '';
  export let placeholder: string = '';
  export let disabled: boolean = false;
  export let errorMsg: string = '';
  export let rows: number = 2;

  $: {
    if (isNil(defaultValue)) {
      defaultValue = '';
    }
  }
</script>

<div class="_gk-textarea">
  <textarea
    {placeholder}
    {disabled}
    {rows}
    class:_gk-textarea-disabled={disabled}
    class:_gk-textarea-has-error={errorMsg}
    value={defaultValue}
    on:input
    on:change
  />
  {#if errorMsg}
    <div class="_gk-textarea-error">{errorMsg}</div>
  {/if}
</div>
