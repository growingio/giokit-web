<script lang="ts">
  import './index.less';
  import {
    _activeStorage,
    _handledIdx,
    _storageValue,
    getters,
    refreshStorage
  } from './store';
  import { Unsubscriber } from 'svelte/store';
  import { backOut } from 'svelte/easing';
  import { crossfade } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { onMount, onDestroy } from 'svelte';
  import { Icon, Modal, Tabs } from '@/components';
  import OptionPop from './components/OptionPop/index.svelte';
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

  let visible: boolean = false;
  let handleItem: any = {};
  let unsubscribe: Unsubscriber;

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

  const handleDelete = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    visible = true;
    handleItem = $_storageValue[$_handledIdx];
    _handledIdx.set(-1);
  };

  const onDelete = () => {
    visible = false;
    storages.removeItem(handleItem.key);
    // @ts-ignore
    refreshStorage();
    handleItem = {};
  };

  const onCancel = () => {
    visible = false;
    handleItem = {};
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
      <OptionPop {handleDelete} />
    </div>
    <Modal
      {visible}
      type="warning"
      title={`确定删除 ${handleItem.key} 吗？`}
      {onCancel}
      onOk={onDelete}
    />
  </div>
</div>
