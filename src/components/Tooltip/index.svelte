<script lang="ts">
  import './index.less';
  import 'tippy.js/dist/svg-arrow.css';
  import 'tippy.js/themes/light.css';
  import { guid } from '@/utils/tools';
  import { onMount } from 'svelte';
  import tippy, { roundArrow } from 'tippy.js';

  export let message: string = '';
  let _id = guid();

  onMount(() => {
    window.setTimeout(() => {
      tippy(document.getElementById(_id), {
        appendTo: document.getElementById('__giokit'),
        arrow: roundArrow,
        content: message,
        delay: 0,
        hideOnClick: true,
        theme: 'light',
        trigger: 'click',
        zIndex: 10010
      });
    }, 0);
  });
</script>

<span id={_id}>
  <slot />
</span>
