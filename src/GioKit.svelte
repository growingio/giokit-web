<script lang="ts">
  import './GioKit.less';
  import { _activeTool, _showNetworkBullet, _openGioKit } from './main/store';
  import { onMount, onDestroy } from 'svelte';
  import Icon from '@/components/Icon/index.svelte';
  import LogModel from './modules/log/model';
  import NetworkModel from './modules/network/model';
  import MainBottomBar from './main/MainBottomBar/index.svelte';
  import MainContent from './main/MainContent/index.svelte';
  import Switcher from './main/Switcher/index.svelte';
  import ToolContent from './main/ToolContent/index.svelte';
  import NetworkBullet from './modules/networkBullet/index.svelte';

  /**
   * Public properties
   */
  export let switchButtonPosition = { x: 0, y: 0 };
  /**
   * Inner properties
   */
  let fontSize: string = '13px';
  let openMain: boolean = false;
  let openMask: boolean = false;
  let openPanel: boolean = false;
  let cssTimer: any;
  let activeTool: string = '';
  let bottomBarList: any[] = [];

  let logModel: any;
  let networkModel: any;

  $: {
    // 窗口开关动画
    if ($_openGioKit === true) {
      openPanel = true;
      openMask = true;
      cssTimer && clearTimeout(cssTimer);
      cssTimer = setTimeout(() => {
        openMain = true;
      }, 10);
    } else {
      openMain = false;
      cssTimer && clearTimeout(cssTimer);
      cssTimer = setTimeout(() => {
        openPanel = false;
        openMask = false;
      }, 330);
    }

    // 底部菜单
    if (activeTool) {
      bottomBarList = completeBarList;
    } else {
      bottomBarList = completeBarList.filter((o) => o.key === 'close');
    }
  }

  /**
   * Lifecycle
   */
  onMount(() => {
    // modify font-size to prevent scaling
    // const dpr = window.devicePixelRatio || 1;
    const viewportEl = document.querySelectorAll('[name="viewport"]');
    if (viewportEl && viewportEl[0]) {
      const viewportContent =
        viewportEl[viewportEl.length - 1].getAttribute('content') || '';
      const initialScale = viewportContent.match(/initial\-scale\=\d+(\.\d+)?/);
      const scale = initialScale
        ? parseFloat(initialScale[0].split('=')[1])
        : 1;
      if (scale !== 1) {
        fontSize = Math.floor((1 / scale) * 13) + 'px';
      }
    }

    logModel = new LogModel();
    networkModel = new NetworkModel();
  });

  onDestroy(() => {
    logModel.unMock();
    networkModel.unMock();
  });

  /**
   * Methods
   */
  const onTapOpen = () => {
    _openGioKit.set(true);
    _showNetworkBullet.set(false);
  };

  const onTapClose = () => {
    _openGioKit.set(false);
  };

  const completeBarList = [
    { label: '清空', key: 'clear', onClick: () => {} },
    { label: '回顶部', key: 'top', onClick: () => {} },
    { label: '至底部', key: 'bottom', onClick: () => {} },
    { label: '关闭', key: 'close', onClick: onTapClose }
  ];
</script>

<div
  id="__giokit"
  class:gk-open={openMain}
  style={fontSize ? 'font-size:' + fontSize + ';' : ''}
>
  {#if $_showNetworkBullet}
    <NetworkBullet />
  {/if}
  <Switcher on:click={onTapOpen} bind:position={switchButtonPosition} />
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="_gk-mask"
    style="display: {openMask ? 'block' : 'none'};"
    on:click={onTapClose}
  />
  <div class="_gk-panel" style="display: {openPanel ? 'flex' : 'none'};">
    <div class="_gk-panel-head">
      {#if $_activeTool}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="_gk-panel-back" on:click={() => _activeTool.set('')}>
          <Icon name="arrowLeft" /> 返回
        </div>
      {/if}
      <div class="_gk-panel-title">
        G<span>IO</span>Kit
      </div>
    </div>
    <div class="_gk-panel-content">
      {#if $_activeTool}
        <ToolContent />
      {:else}
        <MainContent />
      {/if}
    </div>
    <MainBottomBar items={bottomBarList} />
  </div>
</div>
