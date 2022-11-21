<script lang="ts">
  import { _handledIdx } from './store';
  import { keys } from '@/utils/glodash';
  import { onMount } from 'svelte';
  import Cookies from 'js-cookie';
  import Icon from '@/components/Icon/index.svelte';
  import OptionTip from './optionTip.svelte';
  import Tabs from '@/components/Tabs/index.svelte';

  import './index.less';

  const storageTabs = [
    { key: 'cookie', label: 'Cookie' },
    { key: 'local', label: 'LocalStorage' },
    { key: 'session', label: 'SessionStorage' }
  ];

  let activeTab: string = 'cookie';
  let storeList: any = {
    cookie: [],
    local: [],
    session: []
  };

  onMount(() => {
    const cookieStore = Cookies.get();
    storeList.cookie = keys(cookieStore).map((k) => ({
      key: k,
      value: cookieStore[k]
    }));
    storeList.local = keys({ ...localStorage }).map((k) => ({
      key: k,
      value: localStorage[k]
    }));
    storeList.session = keys({ ...sessionStorage }).map((k) => ({
      key: k,
      value: sessionStorage[k]
    }));
  });

  const onTabsChange = (active: string) => {
    _handledIdx.set(-1);
    activeTab = active;
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
    {#each storeList[activeTab] as item, i}
      <div class="_gk-storage-list-item">
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
    <OptionTip
      handleItem={storeList[activeTab][$_handledIdx]}
      length={storeList[activeTab].length}
    />
  </div>
</div>
