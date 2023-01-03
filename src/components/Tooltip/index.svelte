<svelte:options accessors={true} />

<script lang="ts">
  import './index.less';
  import 'tippy.js/dist/svg-arrow.css';
  import { guid } from '@/utils/tools';
  import { onMount } from 'svelte';
  import tippy, { roundArrow } from 'tippy.js';

  export let instance: any = null;

  export let message: string = '';
  export let trigger: 'click' | 'mouseenter' | '' = 'click';
  export let offset: number[] = [0, 10];
  export let placement: string = 'top';
  let _id = guid();

  onMount(() => {
    window.setTimeout(() => {
      instance = tippy(document.getElementById(_id), {
        appendTo: document.getElementById('__giokit'),
        arrow: roundArrow,
        content: message,
        delay: 0,
        hideOnClick: true,
        offset,
        theme: 'tooltip',
        trigger,
        placement,
        zIndex: 10010
      });
    }, 0);
  });
</script>

<span id={_id} class="_gk-tooltip">
  <slot />
</span>
