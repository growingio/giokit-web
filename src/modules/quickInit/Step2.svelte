<script lang="ts">
  import {
    _initOptions,
    step2Initial,
    _integrationType,
    _showAlert
  } from './store';
  import { onMount } from 'svelte';
  import {
    Button,
    FormItem,
    Icon,
    Input,
    Toggle,
    Tooltip,
    Switch
  } from '@/components';

  const switchers = [
    {
      label: '按需集成',
      value: 'demanded'
    },
    {
      label: '全量集成',
      value: 'full'
    }
  ];

  const fileds = [
    'gioCompress',
    'gioEmbeddedAdapter',
    'gioEventAutoTracking',
    'gioHybridAdapter',
    'gioHybridCircle',
    'gioImpressionTracking',
    'gioWebCircle',
    'appId',
    'debug',
    'enableIdMapping',
    'hashtag'
  ];

  export let onNext: () => void = () => {};
  export let onPrev: () => void = () => {};

  let step2Data: any = {};
  let errorMsg: string = '';

  $: {
    if (!step2Data.gioHybridAdapter) {
      step2Data.gioHybridCircle = false;
    }
    if (!step2Data.gioEventAutoTracking) {
      step2Data.gioWebCircle = false;
    }
  }

  onMount(() => {
    fileds.forEach((k) => {
      step2Data[k] = $_initOptions[k];
    });
    step2Data = step2Data;
  });

  const onSwitch = (t: string) => {
    _integrationType.set(t);
    if (t === 'full') {
      fileds.forEach((k) => {
        if (k !== 'appId') {
          step2Data[k] = true;
        }
      });
    } else {
      fileds.forEach((k) => {
        if (k !== 'appId') {
          step2Data[k] = false;
        }
      });
    }
  };

  const onChange = (e: Event | any, key: string) => {
    let value = e.target.value;
    if (value === 'true') {
      value = true;
    }
    if (value === 'false') {
      value = false;
    }
    step2Data[key] = value;
    step2Data = step2Data;
    if (key === 'gioEmbeddedAdapter' && value === false) {
      step2Data.appId = '';
      errorMsg = '';
      _initOptions.update((v) => ({ ...v, appId: '' }));
    }
  };

  const handlePrev = () => {
    onPrev();
  };

  const handleNext = () => {
    if (step2Data.gioEmbeddedAdapter && !step2Data.appId) {
      errorMsg = '请填写小程序AppId！';
      const form = document.getElementById('_gk-qkinit-form');
      if ((form?.scrollHeight ?? 0) > (form?.offsetHeight ?? 0)) {
        (form as any).scrollTop = 0;
      }
      return false;
    } else {
      _initOptions.update((v) => ({ ...v, ...step2Data }));
      // 选择按需集成但开启了全部功能时，自动切换为全量模式以减少初始化代码量
      const opens = Object.values(step2Data).filter((o) => o === true);
      if (opens.length === 10 && $_integrationType === 'demanded') {
        _integrationType.set('full');
        _showAlert.set(true);
      }
      onNext();
    }
  };

  const handleReset = () => {
    step2Data = step2Initial;
    errorMsg = '';
    _initOptions.update((v) => ({ ...v, ...step2Initial }));
  };
</script>

<div class="_gk-qkinit-form-step2">
  <div class="_gk-qkinit-form-step2-switcher">
    请选择集成类型：
    <Switch options={switchers} value={$_integrationType} onChange={onSwitch} />
  </div>
  <FormItem label="小程序内嵌">
    <Toggle
      checked={step2Data.gioEmbeddedAdapter}
      disabled={$_integrationType === 'full'}
      onChange={(e) => onChange(e, 'gioEmbeddedAdapter')}
    />
    <span class="_gk-toggle-value">
      {step2Data.gioEmbeddedAdapter ? '开' : '关'}
    </span>
    <Tooltip
      message="如果您的页面是小程序内嵌页且需要打通用户数据，请开启此项。"
    >
      <Icon name="help" className="_gk-help" />
    </Tooltip>
  </FormItem>
  {#if step2Data.gioEmbeddedAdapter}
    <FormItem label="小程序AppId">
      <Input
        placeholder="请填写小程序AppId"
        value={$_initOptions.appId}
        {errorMsg}
        on:change={(e) => onChange(e, 'appId')}
        on:input={() => (errorMsg = '')}
      />
    </FormItem>
  {/if}
  <FormItem label="App内嵌">
    <Toggle
      checked={step2Data.gioHybridAdapter}
      disabled={$_integrationType === 'full'}
      onChange={(e) => onChange(e, 'gioHybridAdapter')}
    />
    <span class="_gk-toggle-value">
      {step2Data.gioHybridAdapter ? '开' : '关'}
    </span>
    <Tooltip message="如果您的页面是App内嵌页且需要打通用户数据，请开启此项。">
      <Icon name="help" className="_gk-help" />
    </Tooltip>
  </FormItem>
  {#if step2Data.gioHybridAdapter}
    <FormItem label="App内嵌圈选">
      <Toggle
        checked={step2Data.gioHybridCircle}
        disabled={$_integrationType === 'full'}
        onChange={(e) => onChange(e, 'gioHybridCircle')}
      />
      <span class="_gk-toggle-value">
        {step2Data.gioHybridCircle ? '开' : '关'}
      </span>
      <Tooltip message="如果您的App内嵌页需要使用圈选，请开启此项。">
        <Icon name="help" className="_gk-help" />
      </Tooltip>
    </FormItem>
  {/if}
  <FormItem label="无埋点">
    <Toggle
      checked={step2Data.gioEventAutoTracking}
      disabled={$_integrationType === 'full'}
      onChange={(e) => onChange(e, 'gioEventAutoTracking')}
    />
    <span class="_gk-toggle-value"
      >{step2Data.gioEventAutoTracking ? '开' : '关'}</span
    >
    <Tooltip
      message="如果您需要自动采集点击、表单控件输入等无埋点事件，请开启此项。"
    >
      <Icon name="help" className="_gk-help" />
    </Tooltip>
  </FormItem>
  {#if step2Data.gioEventAutoTracking}
    <FormItem label="无埋点圈选">
      <Toggle
        checked={step2Data.gioWebCircle}
        disabled={$_integrationType === 'full'}
        onChange={(e) => onChange(e, 'gioWebCircle')}
      />
      <span class="_gk-toggle-value">
        {step2Data.gioWebCircle ? '开' : '关'}
      </span>
      <Tooltip
        message="如果您需要圈选采集点击、表单控件输入等无埋点事件，请开启此项。"
      >
        <Icon name="help" className="_gk-help" />
      </Tooltip>
    </FormItem>
  {/if}
  <FormItem label="半自动浏览">
    <Toggle
      checked={step2Data.gioImpressionTracking}
      disabled={$_integrationType === 'full'}
      onChange={(e) => onChange(e, 'gioImpressionTracking')}
    />
    <span class="_gk-toggle-value">
      {step2Data.gioImpressionTracking ? '开' : '关'}
    </span>
    <Tooltip message="如果您需要半自动浏览(曝光)事件，请开启此项。">
      <Icon name="help" className="_gk-help" />
    </Tooltip>
  </FormItem>
  <FormItem label="加密压缩">
    <Toggle
      checked={step2Data.gioCompress}
      disabled={$_integrationType === 'full'}
      onChange={(e) => onChange(e, 'gioCompress')}
    />
    <span class="_gk-toggle-value">{step2Data.gioCompress ? '开' : '关'}</span>
  </FormItem>
  <FormItem label="调试模式">
    <Toggle
      checked={step2Data.debug}
      disabled={$_integrationType === 'full'}
      onChange={(e) => onChange(e, 'debug')}
    />
    <span class="_gk-toggle-value">{step2Data.debug ? '开' : '关'}</span>
  </FormItem>
  <FormItem label="多用户身份">
    <Toggle
      checked={step2Data.enableIdMapping}
      disabled={$_integrationType === 'full'}
      onChange={(e) => onChange(e, 'enableIdMapping')}
    />
    <span class="_gk-toggle-value">
      {step2Data.enableIdMapping ? '开' : '关'}
    </span>
  </FormItem>
  <FormItem label="Hash解析">
    <Toggle
      checked={step2Data.hashtag}
      disabled={$_integrationType === 'full'}
      onChange={(e) => onChange(e, 'hashtag')}
    />
    <span class="_gk-toggle-value">{step2Data.hashtag ? '开' : '关'}</span>
  </FormItem>
</div>
<div class="_gk-qkinit-btns">
  <Button on:click={handlePrev}>上一步</Button>
  <Button type="primary" on:click={handleNext}>下一步</Button>
  <Button on:click={handleReset}>重置</Button>
</div>
