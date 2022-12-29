<svelte:options immutable />

<script lang="ts">
  import './index.less';
  import {
    getEnumerableKeys,
    getNonEnumerableKeys,
    getSymbolKeys,
    sortArray
  } from '@/utils/tools';
  import { isArray, isObject } from '@/utils/glodash';
  import LogValue from '../LogValue/index.svelte';

  export let origData: any;
  export let dataKey: string | undefined = undefined;
  export let keyPath: string = '';
  export let keyType: '' | 'private' | 'symbol' = '';
  export let toggle: Record<string, boolean> = {};

  const KEY_PAGE_SIZE = 50;
  let isToggle: boolean = false;
  let isTree: boolean = false;
  let isShowProto: boolean = false;
  let childEnumKeys: string[];
  let childNonEnumKeys: string[];
  let childSymbolKeys: symbol[];
  let childEnumKeyOffset = KEY_PAGE_SIZE;
  let childNonEnumKeyOffset = KEY_PAGE_SIZE;

  class UninvocatableObject {}

  $: {
    isToggle = toggle[keyPath] || false;

    isTree =
      !(origData instanceof UninvocatableObject) &&
      (isArray(origData) || isObject(origData));

    if (isTree && isToggle) {
      // keys only need to be initialized once
      childEnumKeys = childEnumKeys || sortArray(getEnumerableKeys(origData));
      childNonEnumKeys =
        childNonEnumKeys || sortArray(getNonEnumerableKeys(origData));
      childSymbolKeys = childSymbolKeys || getSymbolKeys(origData);
      isShowProto =
        isObject(origData) && childNonEnumKeys.indexOf('__proto__') === -1;
    }
    // (window as any)._gkOrigConsole.log('logTree update');
  }

  const loadNextPageChildKeys = (keyType: 'enum' | 'nonEnum') => {
    if (keyType === 'enum') {
      childEnumKeyOffset += KEY_PAGE_SIZE;
    } else if (keyType === 'nonEnum') {
      childNonEnumKeyOffset += KEY_PAGE_SIZE;
    }
  };
  const getLoadMoreText = (count: number) => {
    return `(...${count} Key${count > 1 ? 's' : ''} Left)`;
  };
  const onTapTreeNode = () => {
    isToggle = !isToggle;
    toggle[keyPath] = isToggle;
  };
  const getValueByKey = (key: any) => {
    // invocate some object's property may cause error,
    // DO NOT invocate `origData[key]` directly.
    try {
      return origData[key];
    } catch (e) {
      return new UninvocatableObject();
    }
  };
</script>

<div
  class="_gk-log-tree"
  class:_gk-log-tree-toggle={isToggle}
  class:_gk-is-tree={isTree}
  data-keypath={keyPath}
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="_gk-log-tree-node" on:click|stopPropagation={onTapTreeNode}>
    <LogValue {origData} {dataKey} {keyType} />
  </div>

  {#if isTree && isToggle}
    <div class="_gk-log-tree-child">
      {#each childEnumKeys as key, i (key)}
        {#if i < childEnumKeyOffset}
          <svelte:self
            origData={getValueByKey(key)}
            dataKey={key}
            keyPath={`${keyPath}.${key}`}
            {toggle}
          />
        {/if}
      {/each}
      {#if childEnumKeyOffset < childEnumKeys.length}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="_gk-log-tree-loadmore"
          on:click={() => loadNextPageChildKeys('enum')}
        >
          {getLoadMoreText(childEnumKeys.length - childEnumKeyOffset)}
        </div>
      {/if}

      {#each childSymbolKeys as key (key)}
        <svelte:self
          origData={getValueByKey(key)}
          dataKey={String(key)}
          keyType="symbol"
          keyPath={`${keyPath}[${String(key)}]`}
          {toggle}
        />
      {/each}

      {#each childNonEnumKeys as key, i (key)}
        {#if i < childNonEnumKeyOffset}
          <svelte:self
            origData={getValueByKey(key)}
            dataKey={key}
            keyType="private"
            keyPath={`${keyPath}.${key}`}
            {toggle}
          />
        {/if}
      {/each}
      {#if childNonEnumKeyOffset < childNonEnumKeys.length}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="_gk-log-tree-loadmore"
          on:click={() => loadNextPageChildKeys('nonEnum')}
        >
          {getLoadMoreText(childNonEnumKeys.length - childNonEnumKeyOffset)}
        </div>
      {/if}

      {#if isShowProto}
        <svelte:self
          origData={getValueByKey('__proto__')}
          dataKey="__proto__"
          keyType="private"
          keyPath={`${keyPath}.__proto__`}
          {toggle}
        />
      {/if}
    </div>
  {/if}
</div>
