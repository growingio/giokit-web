<script lang="ts">
  import { _initOptions, step1Initial, step2Initial } from './store';
  import { isEmpty, isString, unset } from '@/utils/glodash';
  import { onMount } from 'svelte';
  import Button from '@/components/Button/index.svelte';
  import FormItem from '@/components/FormItem/index.svelte';
  import Input from '@/components/Input/index.svelte';
  import Select from '@/components/Select/index.svelte';

  const fileds = ['projectId', 'dataSourceId', 'scheme', 'host', 'version'];
  const ERROR_MESSAGE: any = {
    projectId: '请填写AccountID！',
    dataSourceId: '请填写DataSourceID！',
    host: '请填写上报Host！',
    version: '请填写Web站点版本！'
  };
  const schemeOptions = [
    { label: 'https://', value: 'https://' },
    { label: 'http://', value: 'http://' }
  ];

  export let onNext: () => void = () => {};

  let step1Data: any = {};
  let errorMsg: any = {};

  onMount(() => {
    fileds.forEach((k) => {
      step1Data[k] = $_initOptions[k];
    });
    step1Data = step1Data;
    _initOptions.update((v) => ({ ...v, ...step2Initial }));
  });

  const onChange = (e: Event | any, key: string) => {
    const value = e.target.value;
    step1Data[key] = value;
    step1Data = step1Data;
  };

  const onInput = (key: string) => {
    if (errorMsg[key]) {
      unset(errorMsg, key);
      errorMsg = errorMsg;
    }
  };

  const handleNext = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    // 表单校验
    fileds.forEach((key) => {
      if (!isString(step1Data[key]) || isEmpty(step1Data[key])) {
        errorMsg[key] = ERROR_MESSAGE[key];
      }
    });
    errorMsg = errorMsg;
    if (isEmpty(errorMsg)) {
      _initOptions.update((v) => ({ ...v, ...step1Data }));
      onNext();
    } else {
      const form = document.getElementById('_gk-qkinit-form');
      if ((form?.scrollHeight ?? 0) > (form?.offsetHeight ?? 0)) {
        (form as any).scrollTop = 0;
      }
      return false;
    }
  };

  const handleReset = () => {
    step1Data = step1Initial;
    errorMsg = {};
    _initOptions.update((v) => ({ ...v, ...step1Initial }));
  };
</script>

<div class="_gk-qkinit-form-step1">
  <FormItem label="AccountID">
    <Input
      placeholder="请填写AccountID"
      defaultValue={$_initOptions.projectId}
      errorMsg={errorMsg.projectId}
      on:change={(e) => onChange(e, 'projectId')}
      on:input={() => onInput('projectId')}
    />
  </FormItem>
  <FormItem label="DataSourceID">
    <Input
      placeholder="请填写DataSourceID"
      defaultValue={$_initOptions.dataSourceId}
      errorMsg={errorMsg.dataSourceId}
      on:change={(e) => onChange(e, 'dataSourceId')}
      on:input={() => onInput('dataSourceId')}
    />
  </FormItem>
  <FormItem label="上报Host">
    <div class="_gk-qkinit-form-compact">
      <Select
        options={schemeOptions}
        defaultValue={$_initOptions.scheme || 'https://'}
        onChange={(v) => onChange(v, 'scheme')}
      />
      <Input
        placeholder="支持域名或IP地址"
        defaultValue={$_initOptions.host}
        errorMsg={errorMsg.host}
        on:change={(e) => onChange(e, 'host')}
        on:input={() => onInput('host')}
      />
    </div>
  </FormItem>
  <FormItem label="Web站点版本">
    <Input
      placeholder="请填写Web站点版本"
      defaultValue={$_initOptions.projectId}
      errorMsg={errorMsg.version}
      on:change={(e) => onChange(e, 'version')}
      on:input={() => onInput('version')}
    />
  </FormItem>
</div>
<div class="_gk-qkinit-btns">
  <Button type="primary" on:click={handleNext}>下一步</Button>
  <Button on:click={handleReset}>重置</Button>
</div>
