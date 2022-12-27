<script lang="ts">
  import './index.less';
  import { keys, formatTime } from '@/utils/glodash';
  import { LZString } from './compress';
  import Divider from '@/components/Divider/index.svelte';
  import qs from 'querystringify';

  export let item: any;
  let parameters: any;

  $: {
    parameters = qs.parse(item.params);
  }
</script>

<div class="_gk-network-list-item-content">
  <p>General</p>
  <div class="_gk-network-content-values-wrapper">
    <div class="_gk-network-content-values">
      <span>URL：</span>
      <span>{item.url}</span>
    </div>
    <div class="_gk-network-content-values">
      <span>Method：</span>
      <span>{item.method}</span>
    </div>
    <div class="_gk-network-content-values">
      <span>Request Type：</span>
      <span>{item.type}</span>
    </div>
    <div class="_gk-network-content-values">
      <span>HTTP Status：</span>
      <span>{item.error ? item.error : item.status}</span>
    </div>
    <div class="_gk-network-content-values">
      <span>Time：</span>
      <span>{formatTime(new Date(item.startTime))}</span>
    </div>
  </div>
  <Divider />
  <p>Request Headers</p>
  <div class="_gk-network-content-values-wrapper">
    {#each keys(item.headers) as headerKey}
      <div class="_gk-network-content-values">
        <span>{headerKey}：</span>
        <span>{item.headers[headerKey] || '-'}</span>
      </div>
    {/each}
  </div>
  <Divider />
  <p>Query String Parameters</p>
  <div class="_gk-network-content-values-wrapper">
    {#each keys(parameters) as pk}
      <div class="_gk-network-content-values">
        <span>{pk}：</span>
        <span>{parameters[pk]}</span>
      </div>
    {/each}
  </div>
  <Divider />
  <p>Request Payload</p>
  <div class="_gk-network-content-values-payload">
    {item.isGioData
      ? LZString.compress(JSON.stringify(item.body))
      : JSON.stringify(item.body, null, 2) || ''}
  </div>
</div>
