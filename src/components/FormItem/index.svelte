<script lang="ts">
  import './index.less';

  export let label: string = '';
</script>

<div class="_gk-form-item">
  <div class="_gk-form-item-label">{label}：</div>
  <slot />
  <slot name="extra" />
</div>
