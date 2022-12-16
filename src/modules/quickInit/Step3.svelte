<script lang="ts">
  import { _initOptions } from './store';
  import Switch from '@/components/Switch/index.svelte';
  import Button from '@/components/Button/index.svelte';
  import Icon from '@/components/Icon/index.svelte';
  import Prism from 'prismjs';
  import copy from 'copy-text-to-clipboard';
  import 'prismjs/themes/prism.css';
  import {
    startTemplate,
    generateCDNPluginsImport,
    generateNPMPluginsImport,
    integratedTemplate,
    generatePluginsRegister,
    generateInit,
    endTemplate
  } from './model';
  import { onMount } from 'svelte';

  const switchers = [
    {
      label: 'CDN集成',
      value: 'cdn'
    },
    {
      label: 'NPM集成',
      value: 'npm'
    }
  ];
  export let onPrev: () => void = () => {};
  let integrationMode: 'cdn' | 'npm' = 'cdn';
  let cdnIntegratCode = '';
  let npmIntegratCode = '';
  let copyIcon: 'copy' | 'check' | 'close' = 'copy';

  onMount(() => {
    generateCodes('cdn');
    window.setTimeout(() => {
      // @ts-ignore
      Prism.highlightElement(document.getElementById('_gk-qkinit-code'));
    });
  });

  const generateCodes = (t: 'cdn' | 'npm') => {
    if (t === 'cdn') {
      cdnIntegratCode = `${startTemplate}
${generateCDNPluginsImport($_initOptions)}
${integratedTemplate}
${generatePluginsRegister($_initOptions, integrationMode)}
${generateInit($_initOptions, integrationMode)}
${endTemplate}`;
    } else {
      npmIntegratCode = `${generateNPMPluginsImport($_initOptions)}
${generatePluginsRegister($_initOptions, integrationMode)}
${generateInit($_initOptions, integrationMode)}`;
    }
  };

  const onSwitch = (t: 'cdn' | 'npm') => {
    integrationMode = t;
    generateCodes(t);
    window.setTimeout(() => {
      // @ts-ignore
      Prism.highlightElement(document.getElementById('_gk-qkinit-code'));
    });
  };

  const handleCopy = (e: Event) => {
    let codes = '';
    if (integrationMode === 'cdn') {
      codes = cdnIntegratCode;
    } else {
      codes = npmIntegratCode;
    }
    e.preventDefault();
    e.stopPropagation();
    try {
      copy(codes, {
        target: document.documentElement
      });
      copyIcon = 'check';
    } catch (error) {
      copyIcon = 'close';
    }
    window.setTimeout(() => {
      copyIcon = 'copy';
    }, 800);
  };
</script>

<div class="_gk-qkinit-form-step3">
  <div class="_gk-qkinit-header">1、选择集成方式</div>
  <div class="_gk-qkinit-switcher">
    <Switch options={switchers} value={integrationMode} onChange={onSwitch} />
  </div>
  <div class="_gk-qkinit-header _gk-qkinit-hastool">
    <span>2、获取集成代码并集成</span>
    <Button on:click={handleCopy}>
      <Icon
        name={copyIcon}
        className={copyIcon === 'check' ? '_gk-qkinit-code-copyed' : ''}
      />
    </Button>
  </div>
  <div class="_gk-qkinit-code-container">
    {#if integrationMode === 'cdn'}
      <pre><code id="_gk-qkinit-code" class="language-html">
{cdnIntegratCode}
    </code></pre>
    {:else}
      <pre><code id="_gk-qkinit-code" class="language-javascript">
{npmIntegratCode}
  </code></pre>
    {/if}
  </div>
</div>
<div class="_gk-qkinit-btns-step3">
  <Button on:click={onPrev}>上一步</Button>
</div>
