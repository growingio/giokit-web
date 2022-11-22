<script lang="ts">
  import {
    forEach,
    head,
    isEmpty,
    isNumber,
    isString,
    keys
  } from '@/utils/glodash';
  import { onMount } from 'svelte';
  import Divider from '@/components/Divider/index.svelte';

  import './index.less';

  let locations: any = {};

  // 系统平台
  let system: string = '';
  // 浏览器
  let browser: string = '';

  onMount(() => {
    let o: any = {};
    forEach({ ...window.location }, (v, k) => {
      if (isNumber(v) || isString(v)) {
        o[k] = v;
      }
    });
    locations = o;
    system = navigator.userAgent.match(/ \((.*?);/i)[1] ?? 'N/A';
    if (
      // @ts-ignore
      navigator?.userAgentData?.brands &&
      // @ts-ignore
      !isEmpty(navigator.userAgentData.brands)
    ) {
      // @ts-ignore
      const brand = head(navigator.userAgentData.brands);
      browser = `${brand.brand}/${brand.version}`;
    }
    if (!browser) {
      try {
        browser =
          navigator.userAgent.match(new RegExp(/Gecko\) (.*?) Safari/i))[1] ??
          'N/A';
      } catch (error) {
        browser = getBrowser();
      }
    }
  });

  const getBrowser = () => {
    const regex = {
      ie: /msie (\d+\.\d+)/i,
      firefox: /firefox\/(\d+\.\d+)/i,
      opera: /OPR(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i,
      safari: /safari\/?(\d+\.\d+)?/i,
      chrome: /chrome\/(\d+\.\d+)/i,
      edge: /edg\/(\d+\.\d+)/i
    };
    const bts: any = {};
    keys(regex).forEach((k) => {
      bts[k] =
        navigator.userAgent.match(regex[k]) ||
        navigator.appVersion.match(regex[k]);
    });
    if (bts.ie) {
      return 'Internet Explorer';
    }
    if (bts.firefox) {
      return head(bts.firefox);
    }
    if (bts.opera) {
      return 'Opera';
    }
    if (bts.safari && !bts.chrome) {
      return 'Safari';
    }
    if (bts.edge) {
      return 'Edge';
    }
    if (bts.chrome) {
      return 'Chrome';
    }
  };
</script>

<div class="_gk-system">
  <div class="_gk-system-block">
    <div class="_gk-system-leading">页面信息</div>
    <div class="_gk-system-page-list">
      {#each keys(locations) as key}
        <div class="_gk-system-list-line">
          <span class="_gk-system-list-key">{key}：</span>
          <span class="_gk-system-list-value">{locations[key]}</span>
        </div>
      {/each}
    </div>
  </div>
  <Divider />
  <div class="_gk-system-block">
    <div class="_gk-system-leading">设备信息</div>
    <div class="_gk-system-device-list">
      <div class="_gk-system-list-line">
        <span class="_gk-system-list-key">Client：</span>
        <span class="_gk-system-list-value">{system}</span>
      </div>
      <div class="_gk-system-list-line">
        <span class="_gk-system-list-key">Browser：</span>
        <span class="_gk-system-list-value">{browser}</span>
      </div>
      <div class="_gk-system-list-line">
        <span class="_gk-system-list-key">Language：</span>
        <span class="_gk-system-list-value">{navigator.language}</span>
      </div>
    </div>
    <div class="_gk-system-list-line">
      <span class="_gk-system-list-key">UserAgent：</span>
      <span class="_gk-system-list-value">{navigator.userAgent}</span>
    </div>
  </div>
</div>
