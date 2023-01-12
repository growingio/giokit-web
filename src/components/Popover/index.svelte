<svelte:options accessors={true} />

<script lang="ts">
  import './index.less';
  import { afterUpdate } from 'svelte';
  import { createPopper, Placement } from '@popperjs/core';
  import { guid, niceTry } from '@/utils/tools';
  import { isFunction } from '@/utils/glodash';

  let popperInstance: any;
  let popcorn: any;
  let popper: any;
  let _id: string = guid();

  export let triggerSelector: string | undefined = undefined;
  export let showEvents: string[] = ['click'];
  export let hideEvents: string[] = ['click'];
  export let placement: Placement = 'bottom';
  export let poperWidth: string = '24em';
  export let onShow: () => void = () => {};
  export let onHide: () => void = () => {};

  afterUpdate(() => {
    popcorn = niceTry(() =>
      document.querySelector(triggerSelector ?? `#${_id}`)
    );
    popper = niceTry(() => document.querySelector(`#popper_${_id}`));
    if (popcorn && popper && !popperInstance) {
      popperInstance = createPopper(popcorn as any, popper as any, {
        placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 10]
            }
          },
          {
            name: 'preventOverflow',
            options: {
              padding: 16
            }
          }
        ]
      });
      showEvents.forEach((event) => {
        popcorn?.addEventListener(event, show);
      });
    }
  });

  export const show = () => {
    // 添加属性展示popper
    popper?.setAttribute('data-show', '');
    popperInstance?.update();
    // 调用回调
    if (isFunction(onShow)) {
      onShow();
    }
    // 修改监听
    showEvents.forEach((event) => {
      popcorn.removeEventListener(event, show);
    });
    hideEvents.forEach((event) => {
      popcorn.addEventListener(event, hide);
    });
  };

  export const hide = () => {
    // 移除属性隐藏popper
    popper?.removeAttribute('data-show');
    popperInstance?.update();
    // 调用回调
    if (isFunction(onHide)) {
      onHide();
    }
    // 修改监听
    hideEvents.forEach((event) => {
      popcorn?.removeEventListener(event, hide);
    });
    showEvents.forEach((event) => {
      popcorn?.addEventListener(event, show);
    });
  };
</script>

<div id={_id} class="_gk-popover-trigger">
  <slot name="trigger" />
</div>
<div id={`popper_${_id}`} class="_gk-popover" style={`width:${poperWidth}`}>
  <div class="_gk-popover-arrow" data-popper-arrow />
  <slot name="popper" />
</div>
