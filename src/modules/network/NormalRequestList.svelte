<script lang="ts">
  import './index.less';
  import { _requestQueue } from './store';
  import { isEmpty } from '@/utils/glodash';
  import Collapse from '@/components/Collapse/index.svelte';
  import Duration from './Duration.svelte';
  import Empty from '@/components/Empty/index.svelte';
  import NormalItemContent from './NormalItemContent.svelte';

  let active: string[] = [];

  // 展开/关闭请求条目
  const onItemToggle = (visible: boolean, idx: string) => {
    if (visible) {
      active = [...active, idx];
    } else {
      active = active.filter((o) => o != idx);
    }
  };
</script>

{#if !isEmpty($_requestQueue)}
  <div>
    {#each $_requestQueue as item, i}
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
          <Duration {item} />
        </div>
        <NormalItemContent slot="content" {item} />
      </Collapse>
    {/each}
  </div>
{:else}
  <div class="_gk-network-gio-empty">
    <Empty />
  </div>
{/if}
