<script lang="ts">
  import './index.less';
  import Button from '@/components/Button/index.svelte';
  import Divider from '@/components/Divider/index.svelte';
  import Step1 from './Step1.svelte';
  import Step2 from './Step2.svelte';
  import Step3 from './Step3.svelte';
  import Steps from '@/components/Steps/index.svelte';

  const steps = ['基本信息', '场景配置', '生成代码'];

  let currentStep: number = 0;
</script>

<div class="_gk-qkinit">
  <div class="_gk-qkinit-header">快速初始化</div>
  <div class="_gk-qkinit-desc">通过可视化的方式为您快速生成初始化代码。</div>
  <Divider />
  <Steps items={steps} current={currentStep} />
  <div class="_gk-qkinit-form">
    <form>
      {#if currentStep === 0}
        <Step1 />
      {/if}
      {#if currentStep === 1}
        <Step2 />
      {/if}
      {#if currentStep === 2}
        <Step3 />
      {/if}
    </form>
    <div class="_gk-qkinit-btns">
      {#if currentStep > 0}
        <Button on:click={() => (currentStep = currentStep - 1)}>上一步</Button>
      {/if}
      {#if currentStep < 2}
        <Button type="primary" on:click={() => (currentStep = currentStep + 1)}>
          下一步
        </Button>
      {/if}
    </div>
  </div>
</div>
