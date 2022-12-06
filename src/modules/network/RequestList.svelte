<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { get } from 'svelte/store';
	import { fixed } from '@/utils/glodash';
  import './index.less';
  import { _requestQueue } from './store';
  import Collapse from '@/components/Collapse/index.svelte';
  import NormalItemContent from './NormalItemContent.svelte';
  import GioItemContent from './GioItemContent.svelte';
  import { _activeReqType } from './store';

  let active: string[] = [];
  let unsubscribe;
  let requestQueue = [];

  onMount(() => {
    unsubscribe = _activeReqType.subscribe((v) => {
      active = [];
      if (v === 'gio') {
        const { host, projectId } = (window as any).vds;
        requestQueue = get(_requestQueue).filter((o) => o.url.indexOf(host) > -1 && o.url.indexOf(projectId) > -1);
      } else {
        requestQueue = get(_requestQueue);
      }
    });
  });

  onDestroy(() => {
    unsubscribe();
  });

  const onItemToggle = (visible: boolean, idx: string) => {
    if (visible) {
      active = [...active, idx];
    } else {
      active = active.filter(o => o != idx);
    }
  };

  const durationFormat = (d: string | number) => {
    let n: number | string = Number(d);
    if (!isNaN(n)) {
      if (n < 1000) {
        n = `${fixed(n, 0)}ms`;
      } else if (n >= 1000 && n < 1000000) {
        n = `${fixed(n / 1000, 2)}s`;
      } else {
        n = `${fixed(n / 1000 / 60, 2)}min`
      }
      return n;
    } else {
      return '-'
    }
  };


</script>

<div class="_gk-network-list">
  {#each requestQueue as item, i}
    <Collapse
      title={item.name}
      visible={active.includes(`${i}`)}
      onChange={(v) => onItemToggle(v, `${i}`)}
    >
      <div slot="extra" class="_gk-collapse-item-head-extra">
        <span>{item.method}</span>
        <span class:_gk-network-item-red={item.status === 'ERROR'}>{item.status}</span>
        <span class={`_gk-network-item-${item.durationColor}`}>{durationFormat(item.duration)}</span>
      </div>
      <NormalItemContent slot="content" item={item} />
      <!-- {#if $_activeReqType === 'gio'}
        <GioItemContent slot="content" item={item} />
      {:else}
        <NormalItemContent slot="content" item={item} />
      {/if} -->
    </Collapse>
  {/each}
</div>
