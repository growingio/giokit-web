<script lang="ts">
  import './index.less';
  import {
    _activeStorage,
    _clearVisible,
    _handledIdx,
    _searchValue,
    _searchVisible,
    _storageList,
    getters,
    refreshStorage
  } from './store';
  import { backOut } from 'svelte/easing';
  import { crossfade } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { keys } from '@/utils/glodash';
  import { onMount, onDestroy } from 'svelte';
  import { STORAGE } from '@/constants/enumeration';
  import { Tabs } from '@/components';
  import { Unsubscriber } from 'svelte/store';
  import AddTool from './components/AddTool/index.svelte';
  import ClearPop from '@/components/ClearPop/index.svelte';
  import DeleteModal from './components/DeleteModal/index.svelte';
  import EditModal from './components/EditModal/index.svelte';
  import ItemTools from './components/ItemTools/index.svelte';
  import SearchPop from '@/components/SearchPop/index.svelte';
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

  let searchedList: any = {};
  let unsubscribe_active: Unsubscriber;
  let unsubscribe_storageList: Unsubscriber;
  let unsubscribe_searchValue: Unsubscriber;

  onMount(() => {
    unsubscribe_active = _activeStorage.subscribe((t) => {
      _storageList.set(getters[t]());
    });
    unsubscribe_storageList = _storageList.subscribe((l) => {
      if ($_searchValue) {
        searchStorage($_activeStorage, $_searchValue);
      }
    });
    unsubscribe_searchValue = _searchValue.subscribe((v) => {
      searchStorage($_activeStorage, v);
    });
  });

  onDestroy(() => {
    unsubscribe_active();
    unsubscribe_storageList();
    unsubscribe_searchValue();
  });

  const onTabsChange = (active: string) => {
    _handledIdx.set(-1);
    _activeStorage.set(active);
  };

  const handleOut = () => {
    _searchVisible.set(false);
    _clearVisible.set(false);
  };

  const onSearchStorage = (v: string) => {
    _searchValue.set(v);
    handleOut();
  };

  const searchStorage = (_activeStorage: string, _searchValue: string) => {
    if (_searchValue) {
      searchedList[_activeStorage] = $_storageList.filter(
        (item) =>
          item.key.indexOf(_searchValue) > -1 ||
          item.value.indexOf(_searchValue) > -1
      );
    } else {
      searchedList = {};
    }
  };

  const onClearStorage = () => {
    keys(storages.getAll()).forEach((k) => {
      storages.removeItem(k);
    });
    refreshStorage();
    handleOut();
  };
</script>

<div class="_gk-storage">
  <Tabs
    items={storageTabs}
    defaultActive={$_activeStorage}
    onChange={onTabsChange}
  />
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="_gk-storage-list-wrapper" on:click={handleOut}>
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
      {#each $_searchValue ? searchedList[$_activeStorage] : $_storageList as item, i (item.key)}
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
  </div>
  <div class="_gk-module-tools">
    <AddTool />
    <SearchPop
      id="_gk-storage-tool-search"
      _visible={_searchVisible}
      dot={!!$_searchValue}
      onShow={() => _clearVisible.set(false)}
      onHide={handleOut}
      onSearch={onSearchStorage}
    />
    <ClearPop
      id="_gk-storage-tool-clear"
      message={`确定清空 ${STORAGE[$_activeStorage]} 中的数据吗？`}
      _visible={_clearVisible}
      onShow={() => _searchVisible.set(false)}
      onHide={handleOut}
      onClear={onClearStorage}
    />
  </div>
  <DeleteModal {storages} />
  <EditModal {storages} />
</div>
