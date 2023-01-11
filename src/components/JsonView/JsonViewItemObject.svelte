<script lang="ts">
  import { keys, isNil, typeOf } from '@/utils/glodash';
  import { slide } from 'svelte/transition';
  import TriangularArrow from '@/components/Icon/TriangularArrow/index.svelte';
  import JsonViewItemArray from './JsonViewItemArray.svelte';
  import './index.less';

  export let key: string | number = '';
  export let data: any = {};

  let visible: boolean = true;

  const toggle = () => {
    visible = !visible;
  };
</script>

<div class="_gk-jsonview-item">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="_gk-jsonview-item-head" on:click={() => toggle()}>
    <TriangularArrow direction={visible ? 'down' : 'right'} />
    {#if !isNil(key) && key !== ''}
      {#if typeOf(key) === 'number'}
        <span class="_gk-value-number">{key}</span>
      {:else}
        "{key}"
      {/if}
      {': {'}
    {:else}
      {'{'}
    {/if}
    <!-- 合上时显示省略号和右括号 -->
    {visible ? '' : ' ... }'}
    <!-- 显示对象中字段个数 -->
    <em>{`object [${keys(data).length}]`}</em>
  </div>
  {#if visible}
    <div transition:slide|local>
      {#each keys(data) as k}
        <div id={`__gkjson-${key}_${k}`}>
          {#if typeOf(data[k]) === 'object'}
            <svelte:self key={k} data={data[k]} />
          {:else if typeOf(data[k]) === 'array'}
            <JsonViewItemArray key={k} data={data[k]} />
          {:else}
            "{k}":&nbsp;&nbsp;
            {#if typeOf(data[k]) === 'string'}
              <span class="_gk-value-string">"{data[k]}"</span>
            {:else if typeOf(data[k]) === 'number'}
              <span class="_gk-value-number">{data[k]}</span>
            {:else if typeOf(data[k]) === 'boolean'}
              <span class="_gk-value-boolean">{data[k]}</span>
            {:else}
              <span class="_gk-value-other">{data[k]}</span>
            {/if}
            <em>{typeOf(data[k])}</em>
          {/if}
        </div>
      {/each}
      <div class="_gk-jsonview-item-foot">
        {'}'}
      </div>
    </div>
  {/if}
</div>
