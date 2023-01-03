<script lang="ts">
  import Divider from '@/components/Divider/index.svelte';
  import { has, isEmpty, isFunction } from '@/utils/glodash';

  let vds: any = {};

  $: {
    vds = window.vds ?? {};
  }

  const sdkStatus = () => {
    // 3.8.0版本
    if (has(vds, 'gioSDKInstalled')) {
      if (vds.gioSDKInstalled) {
        if (vds.gioSDKInitialized) {
          return '初始化完成';
        } else {
          return '已集成未初始化SDK';
        }
      } else {
        return '未集成采集SDK';
      }
    } else {
      if (window.gdp) {
        return window.vds ? '初始化完成' : '已集成未初始化SDK';
      } else {
        return '未集成采集SDK';
      }
    }
  };

  const pluginStatus = (v: boolean, pluginName: string): string => {
    const gdp = window.gdp || window.gio || function () {};
    let plugins = [];
    if (isFunction(window?.vds?.canIUse) && vds.canIUse('getPlugins')) {
      plugins = gdp('getPlugins') ?? [];
      const hasPlugin = plugins.find(
        (o: any) => o.name === pluginName && o.method
      );
      let s = v ? '开启' : '关闭';
      if (s && !hasPlugin) {
        return s + '未加载插件';
      } else {
        return s;
      }
    } else {
      return '未知';
    }
  };
</script>

<div class="_gk-qkinit">
  <div class="_gk-ct-header">运行状态</div>
  <div class="_gk-ct-header-desc">通过工具清晰查看当前SDK运行状态。</div>
  <Divider />
  <div class="_gk-grid-list">
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">SDK状态：</span>
      <span class="_gk-grid-list-value">{sdkStatus()}</span>
    </div>
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">SDK集成模式：</span>
      <span class="_gk-grid-list-value"
        >{has(vds, 'gioSDKFull')
          ? vds.gioSDKFull
            ? '全量集成'
            : '按需集成'
          : '未知'}</span
      >
    </div>
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">SDK版本：</span>
      <span class="_gk-grid-list-value">
        {(vds.gioSDKVersion || vds.sdkVer) ?? '-'}
      </span>
    </div>
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">站点版本：</span>
      <span class="_gk-grid-list-value">{vds.version ?? '-'}</span>
    </div>
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">本地集成：</span>
      <span class="_gk-grid-list-value">
        {vds._gr_ignore_local_rule ?? window._gr_ignore_local_rule
          ? '开启'
          : '关闭'}
      </span>
    </div>
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">调试模式：</span>
      <span class="_gk-grid-list-value">{vds.debug ? '开启' : '关闭'}</span>
    </div>
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">Gio项目ID：</span>
      <span class="_gk-grid-list-value">{vds.projectId ?? '-'}</span>
    </div>
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">Gio数据源ID：</span>
      <span class="_gk-grid-list-value">{vds.dataSourceId ?? '-'}</span>
    </div>
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">Gio小程序应用ID：</span>
      <span class="_gk-grid-list-value">{vds.appId ?? '-'}</span>
    </div>
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">GioWeb弹窗数据请求地址：</span>
      <span class="_gk-grid-list-value">{vds.gtouchHost ?? '-'}</span>
    </div>
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">Gio数据上报请求协议：</span>
      <span class="_gk-grid-list-value">{vds.scheme ?? '-'}</span>
    </div>
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">Gio数据上报请求地址：</span>
      <span class="_gk-grid-list-value">{vds.host ?? '-'}</span>
    </div>
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">数据采集开关：</span>
      <span class="_gk-grid-list-value">
        {vds.dataCollect ? '开启' : '关闭'}
      </span>
    </div>
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">Cookie域：</span>
      <span class="_gk-grid-list-value">{vds.cookieDomain || '一级域'}</span>
    </div>

    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">多用户身份：</span>
      <span class="_gk-grid-list-value">
        {vds.enableIdMapping ? '开启' : '关闭'}
      </span>
    </div>
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">Hash解析：</span>
      <span class="_gk-grid-list-value">{vds.hashtag ? '开启' : '关闭'}</span>
    </div>
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">忽略上报字段：</span>
      <span class="_gk-grid-list-value">
        {isEmpty(vds.ignoreFields) ? '无' : vds.ignoreFields.join(', ')}
      </span>
    </div>
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">平台：</span>
      <span class="_gk-grid-list-value">{vds.platform ?? '-'}</span>
    </div>
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">Session有效期：</span>
      <span class="_gk-grid-list-value">{vds.sessionExpires ?? 30} 分钟</span>
    </div>
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">埋点：</span>
      <span class="_gk-grid-list-value">开启</span>
    </div>
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">无埋点：</span>
      <span class="_gk-grid-list-value">
        {pluginStatus(vds.autotrack, 'gioEventAutoTracking')}
      </span>
    </div>
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">加密压缩：</span>
      <span class="_gk-grid-list-value">
        {pluginStatus(vds.autotrack, 'gioCompress')}
      </span>
    </div>
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">启动性能采集：</span>
      <span class="_gk-grid-list-value">
        {pluginStatus(vds?.performance?.monitor, 'gioPerformance')}
      </span>
    </div>
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">错误采集：</span>
      <span class="_gk-grid-list-value">
        {pluginStatus(vds?.performance?.exception, 'gioPerformance')}
      </span>
    </div>
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">小程序打通：</span>
      <span class="_gk-grid-list-value">
        {pluginStatus(!0, 'gioEmbeddedAdapter')}
      </span>
    </div>
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">半自动浏览：</span>
      <span class="_gk-grid-list-value">
        {pluginStatus(!0, 'gioImpressionTracking')}
      </span>
    </div>
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">Native Hybrid适配：</span>
      <span class="_gk-grid-list-value">
        {pluginStatus(!0, 'gioHybridAdapter')}
      </span>
    </div>
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">Native Hybrid圈选：</span>
      <span class="_gk-grid-list-value">
        {pluginStatus(!0, 'gioHybridCircle')}
      </span>
    </div>
    <div class="_gk-grid-list-item">
      <span class="_gk-grid-list-key">Web圈选：</span>
      <span class="_gk-grid-list-value">
        {pluginStatus(!0, 'gioWebCircle')}
      </span>
    </div>
  </div>
</div>
