<script lang="ts">
  import './index.less';
  import { _activeStorage, _handledIdx, _storageValue, getters } from './store';
  import { backOut } from 'svelte/easing';
  import { crossfade } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { onMount, onDestroy } from 'svelte';
  import Icon from '@/components/Icon/index.svelte';
  import OptionTip from './optionTip.svelte';
  import Tabs from '@/components/Tabs/index.svelte';

  let [send, receive] = crossfade({
    duration: 0,
    fallback: () => {
      return {
        duration: 0,
        easing: backOut,
        css: () => `opacity: 0`
      };
    }
  });

  const storageTabs = [
    { key: 'cookie', label: 'Cookie' },
    { key: 'local', label: 'LocalStorage' },
    { key: 'session', label: 'SessionStorage' }
  ];

  let unsubscribe;

  onMount(() => {
    unsubscribe = _activeStorage.subscribe((s) => {
      _storageValue.set(getters[s]());
    });
  });

  onDestroy(() => {
    unsubscribe();
  });

  const onTabsChange = (active: string) => {
    _handledIdx.set(-1);
    _activeStorage.set(active);
  };

  const handleMore = (e: any, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    if ($_handledIdx === idx) {
      _handledIdx.set(-1);
    } else {
      _handledIdx.set(idx);
    }
  };
</script>

<div class="_gk-storage">
  <Tabs items={storageTabs} defaultActive="cookie" onChange={onTabsChange} />
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="_gk-storage-list"
    id="_gk-storage-list"
    on:click={() => _handledIdx.set(-1)}
  >
    <div class="_gk-storage-list-header">
      <div class="_gk-storage-list-header-content">
        <div>Key</div>
        <div>Value</div>
      </div>
      <div class="_gk-storage-list-item-options">Options</div>
    </div>
    {#each $_storageValue as item, i (item.key)}
      <div
        class="_gk-storage-list-item"
        in:receive={{ key: item.key }}
        out:send={{ key: item.key }}
        animate:flip
      >
        <div class="_gk-storage-list-item-content">
          <div>{item.key}</div>
          <div>{item.value}</div>
        </div>
        <div class="_gk-storage-list-item-options">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <span
            id={`_gk-storage-list-item-options-${i}`}
            on:click={(e) => handleMore(e, i)}
          >
            <Icon name="more" />
          </span>
        </div>
      </div>
    {/each}
    <OptionTip />
  </div>
</div>
