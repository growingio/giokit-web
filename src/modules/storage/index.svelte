<script lang="ts">
  import './index.less';
  import { _activeStorage, _handledIdx, _storageList, getters } from './store';
  import { backOut } from 'svelte/easing';
  import { crossfade } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { onMount, onDestroy } from 'svelte';
  import { Tabs } from '@/components';
  import { Unsubscriber } from 'svelte/store';
  import DeleteModal from './components/DeleteModal/index.svelte';
  import EditModal from './components/EditModal/index.svelte';
  import ItemTools from './components/ItemTools/index.svelte';
  import Storages from './storages';

  const storages = new Storages();

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
  let unsubscribe: Unsubscriber;

  onMount(() => {
    unsubscribe = _activeStorage.subscribe((s) => {
      _storageList.set(getters[s]());
    });
  });

  onDestroy(() => {
    unsubscribe();
  });

  const onTabsChange = (active: string) => {
    _handledIdx.set(-1);
    _activeStorage.set(active);
  };
</script>

<div class="_gk-storage">
  <Tabs
    items={storageTabs}
    defaultActive={$_activeStorage}
    onChange={onTabsChange}
  />
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="_gk-storage-list-wrapper">
    <div
      class="_gk-storage-list"
      id="_gk-storage-list"
      on:click={() => _handledIdx.set(-1)}
    >
      <div class="_gk-storage-list-header">
        <div class="_gk-storage-list-header-content">
          <div>名称</div>
          <div>值</div>
        </div>
        <div class="_gk-storage-list-item-options">操作</div>
      </div>
      {#each $_storageList as item, i (item.key)}
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
            <ItemTools idx={i} />
          </div>
        </div>
      {/each}
    </div>
    <DeleteModal {storages} />
    <EditModal {storages} />
  </div>
</div>
