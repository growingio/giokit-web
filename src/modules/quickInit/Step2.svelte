<script lang="ts">
  import FormItem from '@/components/FormItem/index.svelte';
  import Toggle from '@/components/Toggle/index.svelte';
  import Tooltip from '@/components/Tooltip/index.svelte';
  import Icon from '@/components/Icon/index.svelte';

  let embedded: boolean = false;
  let hybrid: boolean = false;
  let hybridCircle: boolean = false;
  let autotrack: boolean = false;
  let webCircle: boolean = false;
  let compress: boolean = false;
  let debug: boolean = false;
  let idMapping: boolean = false;
  let hashtag: boolean = false;

  $: {
    if (!hybrid) {
      hybridCircle = false;
    }
    if (!autotrack) {
      webCircle = false;
    }
  }
</script>

<div class="_gk-qkinit-form-step2">
  <FormItem label="小程序内嵌">
    <Toggle checked={embedded} onChange={(v) => (embedded = v)} />
    <span class="_gk-toggle-value">{embedded ? '开' : '关'}</span>
    <Tooltip
      message="如果您的页面是小程序内嵌页且需要打通用户数据，请开启此项。"
    >
      <Icon name="help" className="_gk-help" />
    </Tooltip>
  </FormItem>
  <FormItem label="App内嵌">
    <Toggle checked={hybrid} onChange={(v) => (hybrid = v)} />
    <span class="_gk-toggle-value">{hybrid ? '开' : '关'}</span>
    <Tooltip message="如果您的页面是App内嵌页且需要打通用户数据，请开启此项。">
      <Icon name="help" className="_gk-help" />
    </Tooltip>
  </FormItem>
  {#if hybrid}
    <FormItem label="App内嵌圈选">
      <Toggle checked={hybridCircle} onChange={(v) => (hybridCircle = v)} />
      <span class="_gk-toggle-value">{hybridCircle ? '开' : '关'}</span>
      <Tooltip message="如果您的App内嵌页需要使用圈选，请开启此项。">
        <Icon name="help" className="_gk-help" />
      </Tooltip>
    </FormItem>
  {/if}
  <FormItem label="无埋点">
    <Toggle checked={autotrack} onChange={(v) => (autotrack = v)} />
    <span class="_gk-toggle-value">{autotrack ? '开' : '关'}</span>
    <Tooltip
      message="如果您需要自动采集点击、表单控件输入等无埋点事件，请开启此项。"
    >
      <Icon name="help" className="_gk-help" />
    </Tooltip>
  </FormItem>
  {#if autotrack}
    <FormItem label="无埋点圈选">
      <Toggle checked={webCircle} onChange={(v) => (webCircle = v)} />
      <span class="_gk-toggle-value">{webCircle ? '开' : '关'}</span>
      <Tooltip
        message="如果您需要圈选采集点击、表单控件输入等无埋点事件，请开启此项。"
      >
        <Icon name="help" className="_gk-help" />
      </Tooltip>
    </FormItem>
  {/if}
  <FormItem label="加密压缩">
    <Toggle checked={compress} onChange={(v) => (compress = v)} />
    <span class="_gk-toggle-value">{compress ? '开' : '关'}</span>
  </FormItem>
  <FormItem label="调试模式">
    <Toggle checked={debug} onChange={(v) => (debug = v)} />
    <span class="_gk-toggle-value">{debug ? '开' : '关'}</span>
  </FormItem>
  <FormItem label="多用户身份">
    <Toggle checked={idMapping} onChange={(v) => (idMapping = v)} />
    <span class="_gk-toggle-value">{idMapping ? '开' : '关'}</span>
  </FormItem>
  <FormItem label="Hash解析">
    <Toggle checked={hashtag} onChange={(v) => (hashtag = v)} />
    <span class="_gk-toggle-value">{hashtag ? '开' : '关'}</span>
  </FormItem>
</div>
