<script lang="ts">
  import '../../index.less';
  import { keys, formatTime, isString } from '@/utils/glodash';
  import { LZString } from '../../compress';
  import { Divider } from '@/components';
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
    <div class="_gk-nw-content-values">
      <span>Time：</span>
      <span>{formatTime(new Date(item.startTime))}</span>
    </div>
  </div>
  <Divider />
  <p>Request Headers</p>
  <div class="_gk-nw-content-values-wrapper">
    {#each keys(item.headers) as headerKey}
      <div class="_gk-nw-content-values">
        <span>{headerKey}：</span>
        <span>{item.headers[headerKey] || '-'}</span>
      </div>
    {/each}
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
  <Divider />
  <p>Request Payload</p>
  <div class="_gk-nw-content-values-payload">
    {#if item.isGioData && item.isGioCompressed}
      {LZString.compress(JSON.stringify(item.body))}
    {:else if item.body}
      {#if isString(item.body)}
        <pre>{item.body}</pre>
      {:else}
        {JSON.stringify(item.body, null, 2)}
      {/if}
    {/if}
  </div>
  <Divider />
  <p>Request Response</p>
  <div class="_gk-nw-content-values-response">
    {#if item.response}
      {#if isString(item.response)}
        <pre>{item.response}</pre>
      {:else}
        {JSON.stringify(item.response, null, 2)}
      {/if}
    {/if}
  </div>
</div>
