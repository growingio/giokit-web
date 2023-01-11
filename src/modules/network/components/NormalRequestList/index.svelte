<script lang="ts">
  import '../../index.less';
  import { _requestQueue } from '../../store';
  import { isEmpty } from '@/utils/glodash';
  import { Collapse, Empty } from '@/components';
  import Duration from '../Duration/index.svelte';
  import NormalItemContent from '../NormalItemContent/index.svelte';

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
          {#if item.isGioData}
            <div><span class="_gk-item-gio-sign">G</span></div>
          {/if}
          <span class="_gk-c-i-1">{item.method}</span>
          <span
            class="_gk-c-i-2"
            class:_gk-nw-item-red={item.status === 'ERROR'}
          >
            {item.status}
          </span>
          <Duration {item} className="_gk-c-i-3" />
        </div>
        <NormalItemContent slot="content" {item} />
      </Collapse>
    {/each}
  </div>
{:else}
  <div class="_gk-nw-gio-empty">
    <Empty />
  </div>
{/if}
