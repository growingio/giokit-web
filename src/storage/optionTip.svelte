<script lang="ts">
  import './index.less';
  import { _handledIdx } from './store';
  import { onMount, onDestroy } from 'svelte';
  import copy from 'copy-text-to-clipboard';
  import Icon from '@/components/Icon/index.svelte';

  export let handleItem: any;
  export let length: number;

  let tippyTop: number = -100;
  let tippyRight: number = -100;
  let tippyPlacement: string = 'right';
  let copyIcon: 'copy' | 'check' | 'close' = 'copy';
  let unsubscribe;

  onMount(() => {
    unsubscribe = _handledIdx.subscribe((idx) => {
      if (idx > -1) {
        const container = document.getElementById('_gk-storage-list');
        const target = document.getElementById(
          `_gk-storage-list-item-options-${idx}`
        );
        const isScrolled = container.scrollHeight > container.offsetHeight;
        // 最后一项且是有滚动条时使得tippy是righttop，防止被遮盖
        if (idx === length - 1 && isScrolled) {
          tippyTop = target.offsetTop - 22;
          tippyPlacement = 'right-top';
        } else {
          tippyTop = target.offsetTop - 14;
          tippyPlacement = 'right';
        }
        tippyRight = container.clientWidth - target.offsetLeft + 20;
      } else {
        tippyTop = -100;
        tippyRight = -100;
        tippyPlacement = 'right';
        copyIcon = 'copy';
      }
    });
  });

  onDestroy(() => {
    unsubscribe();
  });

  const handleCopy = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      copy(`${handleItem.key}=${handleItem.value}`, {
        target: document.documentElement
      });
      copyIcon = 'check';
    } catch (error) {
      copyIcon = 'close';
    }
    window.setTimeout(() => {
      copyIcon = 'copy';
      _handledIdx.set(-1);
      tippyTop = -100;
      tippyRight = -100;
    }, 800);
  };
  const handleEdit = (e: any) => {};
  const handleDelete = (e: any) => {};
</script>

<div
  id="_gk-storage-list-item-options-tippy"
  style={`display:${
    $_handledIdx > -1 ? 'block' : 'none'
  };top:${tippyTop}px;right:${tippyRight}px`}
>
  <div class={`_gk-storage-tippy-arrow ${tippyPlacement}`} />
  <div class="_gk-storage-tippy-inner">
    <div class="_gk-storage-list-item-options-tippy">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span title="复制" on:click={handleCopy}>
        <Icon
          name={copyIcon}
          className={copyIcon === 'check' ? '_gk-storage-list-item-copyed' : ''}
        />
      </span>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- <span title="编辑" on:click={handleEdit}>
      <Icon name="edit" />
    </span> -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span title="删除" on:click={handleDelete}>
        <Icon name="delete" />
      </span>
    </div>
  </div>
</div>
