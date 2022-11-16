<script lang="ts">
  import Icon from '@/components/Icon/index.svelte';
  import { isNumber, isString } from '@/utils/glodash';
  import { safeJSONStringify } from '@/utils/tools';
  import copy from 'copy-text-to-clipboard';

  export let logItem: any;

  let icon: 'copy' | 'check' | 'close' = 'copy';

  const handleCopy = () => {
    const texts: string[] = [];
    try {
      for (let i = 0; i < logItem.data.length; i++) {
        if (
          isString(logItem.data[i].oData) ||
          isNumber(logItem.data[i].oData)
        ) {
          texts.push(logItem.data[i].oData);
        } else {
          // Only copy up to 10 levels of object depth and single key size up to 10KB
          texts.push(
            safeJSONStringify(logItem.data[i].oData, {
              maxDepth: 10,
              keyMaxLen: 10000,
              pretty: false,
              standardJSON: true
            })
          );
        }
      }
      copy(texts.join(' '), { target: document.documentElement });
      icon = 'check';
    } catch (e) {
      icon = 'close';
    }
    window.setTimeout(() => {
      icon = 'copy';
    }, 1000);
  };
</script>

<div class={`_gk-log-row _gk-log-row-${logItem.type}`}>
  {#if ['info', 'warn', 'error'].includes(logItem.type)}
    <div class="_gk-log-row-icon">
      {#if logItem.type === 'info'}
        <Icon name="info" />
      {/if}
      {#if logItem.type === 'warn'}
        <Icon name="warning" className="_gk-icon-warn" />
      {/if}
      {#if logItem.type === 'error'}
        <Icon name="error" className="_gk-icon-error" />
      {/if}
    </div>
  {/if}
  {#if logItem.repeated}
    <div class="_gk-log-row-repeat"><i>{logItem.repeated}</i></div>
  {/if}
  <div class="_gk-log-row-content">
    {#each logItem.data as logData, i (i)}
      <i>{`${logData.oData} `}</i>
    {/each}
  </div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="_gk-log-row-copy" on:click={handleCopy}>
    <Icon name={icon} />
  </div>
</div>
