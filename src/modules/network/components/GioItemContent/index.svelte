<script lang="ts">
  import '../../index.less';
  import { keys } from '@/utils/glodash';
  import Divider from '@/components/Divider/index.svelte';
  import qs from 'querystringify';

  export let item: any;
  let parameters: any;

  $: {
    parameters = qs.parse(item.params);
  }
</script>

<div class="_gk-nw-list-item-content">
  <p>General</p>
  <div class="_gk-nw-content-values-wrapper">
    <div class="_gk-nw-content-values">
      <span>URL：</span>
      <span>{item.url}</span>
    </div>
    <div class="_gk-nw-content-values">
      <span>Method：</span>
      <span>{item.method}</span>
    </div>
    <div class="_gk-nw-content-values">
      <span>Request Type：</span>
      <span>{item.type}</span>
    </div>
    <div class="_gk-nw-content-values">
      <span>HTTP Status：</span>
      <span>{item.error ? item.error : item.status}</span>
    </div>
  </div>
  <Divider />
  <p>Request Headers</p>
  <div class="_gk-nw-content-values-wrapper">
    <div class="_gk-nw-content-values">
      <span>Content-Type：</span>
      <span>{item.headers['content-type'] || '-'}</span>
    </div>
  </div>
  <Divider />
  <p>Query String Parameters</p>
  <div class="_gk-nw-content-values-wrapper">
    {#each keys(parameters) as pk}
      <div class="_gk-nw-content-values">
        <span>{pk}：</span>
        <span>{parameters[pk]}</span>
      </div>
    {/each}
  </div>
</div>
