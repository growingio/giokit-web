<script lang="ts">
  import { _logQueue } from './store';
  import { head, isEmpty } from '@/utils/glodash';
  import LogRow from './logRow.svelte';
  import Tabs from '@/components/Tabs/index.svelte';

  import './index.less';

  const logsTabs = [
    { key: 'all', label: 'All' },
    { key: 'gio', label: 'GIO' },
    { key: 'log', label: 'Log' },
    { key: 'info', label: 'Info' },
    { key: 'warn', label: 'Warn' },
    { key: 'error', label: 'Error' }
  ];

  let logQueue = [];
  let activeTab: string = 'all';

  $: {
    if (!isEmpty($_logQueue)) {
      switch (activeTab) {
        case 'all':
          logQueue = $_logQueue;
          break;
        case 'gio': {
          logQueue = $_logQueue.filter((o) => {
            const rowData = o.data;
            if (
              head(rowData) &&
              head(rowData)?.oData &&
              head(rowData)?.oData?.indexOf('[GrowingIO') > -1
            ) {
              return true;
            } else {
              return false;
            }
          });
          break;
        }
        case 'log':
        case 'info':
        case 'warn':
        case 'error': {
          logQueue = $_logQueue.filter((o) => o.type === activeTab);
          break;
        }
        default:
          break;
      }
    }
  }

  const onTabsChange = (active) => {
    activeTab = active;
  };
</script>

<div class="_gk-log">
  <Tabs items={logsTabs} defaultActive="all" onChange={onTabsChange} />
  <div class="_gk-log-container">
    {#each logQueue as item}
      <LogRow logItem={item} />
    {/each}
  </div>
</div>
