<svelte:options immutable />

<script lang="ts">
  import { getValueTextAndType, getVisibleText } from '@/utils/tools';
  import './index.less';

  export let origData: any;
  export let style: string = '';
  export let dataKey: string | undefined = undefined;
  export let keyType: '' | 'private' | 'symbol' = '';

  let dataValue: string = '';
  let valueType: string = '';
  let isInTree: boolean = false;

  $: {
    // the value is NOT in a tree when key is undefined
    isInTree = dataKey !== undefined;

    const ret = getValueTextAndType(origData, isInTree);
    valueType = ret.valueType;
    dataValue = ret.text;

    if (!isInTree && valueType === 'string') {
      // if it's a single string, then keep line breaks.
      dataValue = dataValue.replace(/\\n/g, '\n').replace(/\\t/g, '    ');
    }
  }
</script>

{#if dataKey !== undefined}
  <i
    class="_gk-log-key"
    class:_gk-log-key-symbol={keyType === 'symbol'}
    class:_gk-log-key-private={keyType === 'private'}
    >{getVisibleText(dataKey)}</i
  >:{/if}
<i
  class="_gk-log-val _gk-log-val-{valueType}"
  class:_gk-log-val-haskey={dataKey !== undefined}
  {style}
>
  {dataValue}
</i>
