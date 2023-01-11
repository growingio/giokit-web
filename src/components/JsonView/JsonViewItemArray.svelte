<script lang="ts">
  import { isArray, isNil, typeOf } from '@/utils/glodash';
  import { slide } from 'svelte/transition';
  import TriangularArrow from '@/components/Icon/TriangularArrow/index.svelte';
  import JsonViewItemObject from './JsonViewItemObject.svelte';
  import './index.less';

  export let key: string | number = '';
  export let data: any[] = [];

  let visible: boolean = true;

  const toggle = () => {
    visible = !visible;
  };
</script>

<div class="_gk-jsonview-item">
  {#if isArray(data)}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="_gk-jsonview-item-head" on:click={() => toggle()}>
      <TriangularArrow direction={visible ? 'down' : 'right'} />
      {#if !isNil(key) && key !== ''}
        {#if typeOf(key) === 'number'}
          <span class="_gk-value-number">{key}</span>
        {:else}
          <span class="_gk-value-string">"{key}"</span>
        {/if}
        {': ['}
      {:else}
        {'['}
      {/if}
      <!-- 合上时显示省略号和右括号 -->
      {visible ? '' : ' ... ]'}
      <!-- 显示对象中字段个数 -->
      <em class="text-gray-400">{`array [${data.length}]`}</em>
    </div>
  {/if}
  {#if visible}
    <div transition:slide|local>
      {#each data as dataItem, i}
        <JsonViewItemObject key={i} data={dataItem} />
      {/each}
      <div class="_gk-jsonview-item-foot">{']'}</div>
    </div>
  {/if}
</div>
