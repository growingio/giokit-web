<script lang="ts">
  import './index.less';

  export let placeholder: string = '';
  export let disabled: boolean = false;
  export let errorMsg: string = '';
</script>

<div class="_gk-input">
  <input
    {placeholder}
    {disabled}
    class:_gk-input-disabled={disabled}
    class:_gk-input-has-error={errorMsg}
  />
  {#if errorMsg}
    <div class="_gk-input-error">{errorMsg}</div>
  {/if}
</div>
