<script lang="ts">
  import './index.less';
  import { _showRealTimeMonitor } from '../store';
  import { onMount } from 'svelte';
  import { Unsubscriber } from 'svelte/store';
  import { Icon, Tooltip } from '@/components';

  /**
   * Public properties
   */
  export let show = true;
  export let position = { x: 0, y: 0 };
  /**
   * Inner properties
   */
  const switchPos = {
    hasMoved: false, // exclude click event
    x: 0, // right
    y: 0, // bottom
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0
  };
  const btnSwitchPos = {
    x: 0,
    y: 0
  };
  let btnSwitch: HTMLElement;
  let tipInstance: any;
  let unsubscribe: Unsubscriber;

  $: {
    if (btnSwitch) {
      setSwitchPosition(position.x, position.y);
    }
  }

  onMount(() => {
    unsubscribe = _showRealTimeMonitor.subscribe((v) => {
      if (v && tipInstance.instance) {
        tipInstance.instance.show();
        window.setTimeout(() => {
          tipInstance.instance.hide();
        }, 3000);
      }
    });
  });

  /**
   * Methods
   */
  const setSwitchPosition = (switchX: number, switchY: number) => {
    [switchX, switchY] = _getSwitchButtonSafeAreaXY(switchX, switchY);
    switchPos.x = switchX;
    switchPos.y = switchY;
    btnSwitchPos.x = switchX;
    btnSwitchPos.y = switchY;
    localStorage.setItem('GioKit_switch_x', switchX + '');
    localStorage.setItem('GioKit_switch_y', switchY + '');
  };

  /**
   * Get an safe [x, y] position for switch button
   */
  const _getSwitchButtonSafeAreaXY = (x: number, y: number) => {
    const docWidth = Math.max(
      document.documentElement.offsetWidth,
      window.innerWidth
    );
    const docHeight = Math.max(
      document.documentElement.offsetHeight,
      window.innerHeight
    );
    // check edge
    if (x + btnSwitch.offsetWidth > docWidth) {
      x = docWidth - btnSwitch.offsetWidth;
    }
    if (y + btnSwitch.offsetHeight > docHeight) {
      y = docHeight - btnSwitch.offsetHeight;
    }
    if (x < 25) {
      x = 25;
    }
    if (docWidth - x < btnSwitch.offsetWidth + 10) {
      x = docWidth - (btnSwitch.offsetWidth + 10);
    }
    if (y < 60) {
      y = 60;
    }
    if (window.innerHeight - y < btnSwitch.offsetHeight + 10) {
      y = window.innerHeight - (btnSwitch.offsetHeight + 10);
    }
    return [x, y];
  };

  const onTouchStart = (e: any) => {
    switchPos.startX = e.touches[0].pageX;
    switchPos.startY = e.touches[0].pageY;
    switchPos.hasMoved = false;
  };
  const onTouchEnd = (e: any) => {
    if (!switchPos.hasMoved) {
      return;
    }
    switchPos.startX = 0;
    switchPos.startY = 0;
    switchPos.hasMoved = false;
    setSwitchPosition(switchPos.endX, switchPos.endY);
  };
  const onTouchMove = (e: any) => {
    if (e.touches.length <= 0) {
      return;
    }
    const offsetX = e.touches[0].pageX - switchPos.startX,
      offsetY = e.touches[0].pageY - switchPos.startY;
    let x = Math.floor(switchPos.x - offsetX),
      y = Math.floor(switchPos.y - offsetY);
    [x, y] = _getSwitchButtonSafeAreaXY(x, y);
    btnSwitchPos.x = x;
    btnSwitchPos.y = y;
    switchPos.endX = x;
    switchPos.endY = y;
    switchPos.hasMoved = true;
    e.preventDefault();
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="_gk-switcher"
  class:_gk-switcher-processing={$_showRealTimeMonitor}
  style="right: {btnSwitchPos.x}px; bottom: {btnSwitchPos.y}px; display: {show
    ? 'block'
    : 'none'};"
  bind:this={btnSwitch}
  on:touchstart|nonpassive={onTouchStart}
  on:touchend|nonpassive={onTouchEnd}
  on:touchmove|nonpassive={onTouchMove}
  on:click
>
  <Tooltip
    message="已开启Gio事件实时监控，请继续操作"
    placement="left"
    trigger={''}
    bind:this={tipInstance}
  >
    <Icon name="gio" />
  </Tooltip>
</div>
