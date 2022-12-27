<script lang="ts">
  import {
    forEach,
    head,
    last,
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
    system = (navigator?.userAgent?.match(/ \((.*?);/i) ?? [])[1] ?? 'N/A';
    // 谷歌内核才会有的navigator.userAgentData
    if (
      // @ts-ignore
      navigator?.userAgentData?.brands &&
      // @ts-ignore
      !isEmpty(navigator.userAgentData.brands)
    ) {
      // Edge
      if (navigator.userAgent.indexOf('Edg/') > -1) {
        // @ts-ignore
        const brand = head(navigator.userAgentData.brands);
        browser = `${brand.brand}/${brand.version}`;
      } else {
        // Chrome
        // @ts-ignore
        const brand = last(navigator.userAgentData.brands);
        browser = `${brand.brand}/${brand.version}`;
      }
    }
    if (!browser) {
      browser = getBrowser();
    }
  });

  const getBrowser = () => {
    const regex: any = {
      ie: /msie (\d+\.\d+)/i,
      firefox: /firefox\/(\d+)/i,
      opera: /OPR(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i,
      safari: /safari\/?(\d+)?/i,
      chrome: /chrome\/(\d+)/i
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
      return head(bts.safari);
    }
  };
</script>

<div class="_gk-system">
  <div class="_gk-system-block">
    <div class="_gk-content-header">页面信息</div>
    <div class="_gk-content-header-desc">
      查看当前页面在浏览器解析下的状态值。
    </div>
    <Divider />
    <div class="_gk-grid-list">
      {#each keys(locations) as key}
        <div class="_gk-grid-list-item">
          <span class="_gk-grid-list-key">{key}：</span>
          <span class="_gk-grid-list-value">{locations[key]}</span>
        </div>
      {/each}
    </div>
  </div>
  <div class="_gk-system-block">
    <div class="_gk-content-header">设备信息</div>
    <div class="_gk-content-header-desc">查看当前设备的基本信息。</div>
    <Divider />
    <div class="_gk-grid-list">
      <div class="_gk-grid-list-item">
        <span class="_gk-grid-list-key">Client：</span>
        <span class="_gk-grid-list-value">{system}</span>
      </div>
      <div class="_gk-grid-list-item">
        <span class="_gk-grid-list-key">Browser：</span>
        <span class="_gk-grid-list-value">{browser}</span>
      </div>
      <div class="_gk-grid-list-item">
        <span class="_gk-grid-list-key">Language：</span>
        <span class="_gk-grid-list-value">{navigator.language}</span>
      </div>
    </div>
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">UserAgent：</span>
      <span class="_gk-grid-list-value">{navigator.userAgent}</span>
    </div>
  </div>
</div>
