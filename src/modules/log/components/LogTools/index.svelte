<script lang="ts">
  import './index.less';
  import ClearPop from '../ClearPop/index.svelte';
  import SearchPop from '../SearchPop/index.svelte';
  import CommandPop from '../CommandPop/index.svelte';
</script>

<div class="_gk-log-tools">
  <CommandPop />
  <SearchPop {...$$props} />
  <ClearPop />
</div>
