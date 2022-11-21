<script lang="ts">
  import { keys } from '@/utils/glodash';
  import { onMount } from 'svelte';
  import Cookies from 'js-cookie';
  import copy from 'copy-text-to-clipboard';
  import Icon from '@/components/Icon/index.svelte';
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
  let handledIdx: number = -1;
  let tippyTop: number = -100;
  let tippyRight: number = -100;
  let tippyPlacement: string = 'right';
  let copyIcon: 'copy' | 'check' | 'close' = 'copy';

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
    handleCloseTippy();
    activeTab = active;
  };

  const handleMore = (e: any, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (handledIdx === idx) {
      handleCloseTippy();
    } else {
      handledIdx = idx;
      const container = document.getElementById('_gk-storage-list');
      const target = document.getElementById(
        `_gk-storage-list-item-options-${idx}`
      );
      const isScrolled = container.scrollHeight > container.offsetHeight;
      // 最后一项且是有滚动条时使得tippy是righttop，防止被遮盖
      if (idx === storeList[activeTab].length - 1 && isScrolled) {
        tippyTop = target.offsetTop - 22;
        tippyPlacement = 'right-top';
      } else {
        tippyTop = target.offsetTop - 14;
        tippyPlacement = 'right';
      }
      tippyRight = container.clientWidth - target.offsetLeft + 20;
    }
  };

  const handleCloseTippy = () => {
    handledIdx = -1;
    tippyTop = -100;
    tippyRight = -100;
  };

  const handleCopy = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const item = storeList[activeTab][handledIdx];
      copy(`${item.key}=${item.value}`, { target: document.documentElement });
      copyIcon = 'check';
    } catch (error) {
      copyIcon = 'close';
    }
    window.setTimeout(() => {
      copyIcon = 'copy';
      handledIdx = -1;
      tippyTop = -100;
      tippyRight = -100;
    }, 800);
  };
  const handleEdit = (e: any) => {};
  const handleDelete = (e: any) => {};
</script>

<div class="_gk-storage">
  <Tabs items={storageTabs} defaultActive="cookie" onChange={onTabsChange} />
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="_gk-storage-list"
    id="_gk-storage-list"
    on:click={handleCloseTippy}
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
    <div
      id="_gk-storage-list-item-options-tippy"
      style={`display:${
        handledIdx > -1 ? 'block' : 'none'
      };top:${tippyTop}px;right:${tippyRight}px`}
    >
      <div class={`_gk-storage-tippy-arrow ${tippyPlacement}`} />
      <div class="_gk-storage-tippy-inner">
        <div class="_gk-storage-list-item-options-tippy">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <span title="复制" on:click={handleCopy}>
            <Icon
              name={copyIcon}
              className={copyIcon === 'check'
                ? '_gk-storage-list-item-copyed'
                : ''}
            />
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
  </div>
</div>
