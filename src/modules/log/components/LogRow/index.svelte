<script lang="ts">
  import { isArray, isObject } from '@/utils/glodash';
  import { isNumber, isString } from '@/utils/glodash';
  import { safeJSONStringify } from '@/utils/tools';
  import copy from 'copy-text-to-clipboard';
  import { Icon, OutputArrow } from '@/components';
  import LogTree from '../LogTree/index.svelte';
  import LogValue from '../LogValue/index.svelte';

  export let logItem: any;

  let copyIcon: 'copy' | 'check' | 'close' = 'copy';

  const isTree = (origData: any) => {
    class UninvocatableObject {}
    return (
      !(origData instanceof UninvocatableObject) &&
      (isArray(origData) || isObject(origData))
    );
  };

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
      copyIcon = 'check';
    } catch (e) {
      copyIcon = 'close';
    }
    window.setTimeout(() => {
      copyIcon = 'copy';
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
  {#if logItem.cmdType === 'input'}
    <span class="_gk-input-arrow">
      <Icon name="arrowLeft" />
    </span>
  {/if}
  {#if logItem.cmdType === 'output'}
    <OutputArrow />
  {/if}
  {#if logItem.repeated}
    <div class="_gk-log-row-repeat">
      <i>{logItem.repeated}</i>
    </div>
  {/if}
  <div class="_gk-log-row-content">
    {#each logItem.data as logData, i (i)}
      {#if isTree(logData.oData)}
        <LogTree
          origData={logData.oData}
          keyPath={String(i)}
          toggle={logData.toggle}
        />
      {:else}
        <LogValue origData={logData.oData} style={logData.style} />
      {/if}
    {/each}
  </div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="_gk-log-row-copy" on:click={handleCopy}>
    <Icon name={copyIcon} />
  </div>
</div>
