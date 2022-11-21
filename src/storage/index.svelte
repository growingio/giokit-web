<script lang="ts">
  import Tabs from '@/components/Tabs/index.svelte';
  import Icon from '@/components/Icon/index.svelte';
  import { keys } from '@/utils/glodash';
  import Cookies from 'js-cookie';
  import { onMount, onDestroy } from 'svelte';
  import tippy from 'tippy.js';
  import 'tippy.js/dist/tippy.css';
  import 'tippy.js/themes/light.css';

  import './index.less';

  tippy.setDefaultProps({
    trigger: 'click focus',
    placement: 'left',
    allowHTML: true,
    interactive: true,
    zIndex: 10010,
    theme: 'light',
    appendTo: () => document.getElementById('__giokit'),
    onHidden: (inst) => {
      inst.destroy();
      handledIdx = -1;
    }
  });

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
  let handledIdx: number = -1;
  let tippies: any[] = [];

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

  onDestroy(() => {
    tippies.forEach((o) => o?.destroy());
  });

  const onTabsChange = (active: string) => {
    activeTab = active;
  };

  const handleMore = (idx: number) => {
    console.log(idx);
    handledIdx = idx;
    const targetId = `#_gk-storage-list-item-options-${idx}`;
    const template = document.getElementById(
      '_gk-storage-list-item-options-tippy'
    );
    tippies = tippy(targetId, {
      content: template.innerHTML
    });
  };

  const handleCopy = () => {};
  const handleEdit = () => {};
  const handleDelete = () => {};
</script>

<div class="_gk-storage">
  <Tabs items={storageTabs} defaultActive="cookie" onChange={onTabsChange} />
  <div class="_gk-storage-list">
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
            on:click={() => handleMore(i)}
          >
            <Icon name="more" />
          </span>
        </div>
      </div>
    {/each}
  </div>
  <div id="_gk-storage-list-item-options-tippy">
    <div class="_gk-storage-list-item-options-tippy">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span title="复制" on:click={handleCopy}>
        <Icon name="copy" />
      </span>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span title="编辑" on:click={handleEdit}>
        <Icon name="edit" />
      </span>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span title="删除" on:click={handleDelete}>
        <Icon name="delete" />
      </span>
    </div>
  </div>
</div>
