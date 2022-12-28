<script lang="ts">
  import './index.less';

  export let checked: boolean = false;
  export let disabled: boolean = false;
  export let onChange: (e: Event, checked: boolean) => void = (
    e: Event,
    checked: boolean
  ) => {};

  const handleChange = (e: Event) => {
    checked = !checked;
    // @ts-ignore
    e.target.value = checked;
    onChange(e, checked);
  };
</script>

<button
  class="_gk-toggle"
  class:_gk-toggle-checked={checked}
  class:_gk-toggle-disabled={disabled}
  {disabled}
  on:click={handleChange}
>
  <div class="_gk-toggle-handle" />
</button>
