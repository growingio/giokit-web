<script lang="ts">
  import './index.less';
  import Divider from '@/components/Divider/index.svelte';
  import Step1 from './Step1.svelte';
  import Step2 from './Step2.svelte';
  import Step3 from './Step3.svelte';
  import Steps from '@/components/Steps/index.svelte';
  import { onDestroy, onMount } from 'svelte';

  const steps = ['基本信息', '场景配置', '生成代码'];

  let currentStep: number = -1;

  onMount(() => {
    currentStep = 0;
  });

  onDestroy(() => {
    currentStep = -1;
  });
</script>

<div class="_gk-qkinit">
  <div class="_gk-ct-header">快速初始化</div>
  <div class="_gk-ct-header-desc">通过可视化的方式为您快速生成初始化代码。</div>
  <Divider />
  <Steps items={steps} current={currentStep} />
  <div class="_gk-qkinit-form" id="_gk-qkinit-form">
    {#if currentStep < 2}
      <div class="_gk-form">
        {#if currentStep === 0}
          <Step1 onNext={() => (currentStep = currentStep + 1)} />
        {/if}
        {#if currentStep === 1}
          <Step2
            onPrev={() => (currentStep = currentStep - 1)}
            onNext={() => (currentStep = currentStep + 1)}
          />
        {/if}
      </div>
    {/if}
    {#if currentStep === 2}
      <Step3 onPrev={() => (currentStep = currentStep - 1)} />
    {/if}
  </div>
</div>
