<script lang="ts">
  import { isNil } from '@/utils/glodash';
  import './index.less';

  export let value: string = '';
  export let placeholder: string = '';
  export let disabled: boolean = false;
  export let errorMsg: string = '';
  export let rows: number = 2;

  $: {
    if (isNil(value)) {
      value = '';
    }
  }
</script>

<div class="_gk-textarea">
  <textarea
    {placeholder}
    {disabled}
    {rows}
    {value}
    class:_gk-textarea-disabled={disabled}
    class:_gk-textarea-has-error={errorMsg}
    on:input
    on:change
    on:keydown
  />
  {#if errorMsg}
    <div class="_gk-textarea-error">{errorMsg}</div>
  {/if}
</div>
