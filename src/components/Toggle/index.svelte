<script lang="ts">
  import './index.less';

  export let checked: boolean = false;
  export let onChange: (checked: boolean) => void = (checked: boolean) => {};

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
  on:click={handleChange}
>
  <div class="_gk-toggle-handle" />
</button>
