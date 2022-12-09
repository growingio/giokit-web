<script lang="ts">
  import './index.less';
  import { fixed } from '@/utils/glodash';
  import Collapse from '@/components/Collapse/index.svelte';
  import NormalItemContent from './NormalItemContent.svelte';

  export let requestQueue: any[];
  let active: string[] = [];

  // 展开/关闭请求条目
  const onItemToggle = (visible: boolean, idx: string) => {
    if (visible) {
      active = [...active, idx];
    } else {
      active = active.filter((o) => o != idx);
    }
  };

  // 格式化请求时长
  const durationFormat = (d: string | number) => {
    let n: number | string = Number(d);
    if (!isNaN(n)) {
      if (n < 1000) {
        n = `${fixed(n, 0)}ms`;
      } else if (n >= 1000 && n < 1000000) {
        n = `${fixed(n / 1000, 2)}s`;
      } else {
        n = `${fixed(n / 1000 / 60, 2)}min`;
      }
      return n;
    } else {
      return '-';
    }
  };
</script>

{#each requestQueue as item, i}
  <Collapse
    title={item.name}
    visible={active.includes(`${i}`)}
    onChange={(v) => onItemToggle(v, `${i}`)}
  >
    <div slot="extra" class="_gk-collapse-item-head-extra">
      <span>{item.method}</span>
      <span class:_gk-network-item-red={item.status === 'ERROR'}>
        {item.status}
      </span>
      <span class={`_gk-network-item-${item.durationColor}`}>
        {durationFormat(item.duration)}
      </span>
    </div>
    <NormalItemContent slot="content" {item} />
  </Collapse>
{/each}
