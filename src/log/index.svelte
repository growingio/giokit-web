<script lang="ts">
  import Tabs from '@/components/Tabs/index.svelte';
  import { _logQueue } from './store';
  import LogRow from './LogRow.svelte';

  import './index.less';

  let logsTabs = [
    { key: 'all', label: 'All' },
    { key: 'gio', label: 'GIO' },
    { key: 'log', label: 'Log' },
    { key: 'info', label: 'Info' },
    { key: 'warn', label: 'Warn' },
    { key: 'error', label: 'Error' }
  ];
</script>

<div class="_gk-log">
  <Tabs items={logsTabs} />
  <div class="_gk-log-container">
    {#each $_logQueue as item}
      <LogRow logItem={item} />
    {/each}
  </div>
</div>
