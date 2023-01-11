<script lang="ts">
  import { _initOptions, _integrationType, _showAlert } from './store';
  import { Switch, Button, Icon, Alert, Tooltip } from '@/components';
  import Prism from 'prismjs';
  import copy from 'copy-text-to-clipboard';
  import 'prismjs/themes/prism.css';
  import {
    startTemplate,
    generateCDNPluginsImport,
    generateNPMPluginsImport,
    demandedTemplate,
    fullTemplate,
    generateNPMImport,
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
    if ($_integrationType === 'demanded') {
      generateCodes('cdn');
    } else {
      generateFullCodes('cdn');
    }
    window.setTimeout(() => {
      // @ts-ignore
      Prism.highlightElement(document.getElementById('_gk-qkinit-code'));
    });
  });

  // 生成全量集成的代码
  const generateFullCodes = (t: 'cdn' | 'npm') => {
    if (t === 'cdn') {
      cdnIntegratCode = `${startTemplate}
${fullTemplate}
${generateInit($_initOptions, integrationMode)}
${endTemplate}`;
    } else {
      npmIntegratCode = `${generateNPMImport(true)}
${generateInit($_initOptions, integrationMode)}`;
    }
  };

  // 生成按需集成的代码
  const generateCodes = (t: 'cdn' | 'npm') => {
    if (t === 'cdn') {
      cdnIntegratCode = `${startTemplate}
${generateCDNPluginsImport($_initOptions)}
${demandedTemplate}
${generatePluginsRegister($_initOptions, integrationMode)}
${generateInit($_initOptions, integrationMode)}
${endTemplate}`;
    } else {
      npmIntegratCode = `${generateNPMImport(false)}${generateNPMPluginsImport(
        $_initOptions
      )}
${generatePluginsRegister($_initOptions, integrationMode)}
${generateInit($_initOptions, integrationMode)}`;
    }
  };

  const onSwitch = (t: 'cdn' | 'npm') => {
    integrationMode = t;
    if ($_integrationType === 'demanded') {
      generateCodes(t);
    } else {
      generateFullCodes(t);
    }
    window.setTimeout(() => {
      // @ts-ignore
      Prism.highlightElement(document.getElementById('_gk-qkinit-code'));
      if (t === 'npm') {
        Prism.highlightElement(document.getElementById('_gk-qkinit-npmcode'));
      }
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

  const onAlertClose = () => {
    _showAlert.set(false);
  };
</script>

<div class="_gk-qkinit-form-step3">
  {#if $_showAlert}
    <Alert
      type="info"
      message="提示"
      description="您已选择SDK的所有功能，将为您生成全量集成代码。"
      showIcon
      closeable
      onClose={onAlertClose}
    />
  {/if}
  <div class="_gk-qkinit-header">1、选择集成方式</div>
  <div class="_gk-qkinit-switcher">
    <Switch options={switchers} value={integrationMode} onChange={onSwitch} />
  </div>
  {#if integrationMode === 'npm'}
    <div class="_gk-qkinit-header">
      2、安装NPM包
      <div>
        <pre><code id="_gk-qkinit-npmcode">npm i gio-webjs-sdk-cdp --save</code
          ></pre>
      </div>
    </div>
  {/if}
  <div class="_gk-qkinit-header _gk-qkinit-hastool">
    <span>
      {#if integrationMode === 'cdn'}2{:else}3{/if}、获取集成代码并集成
    </span>
    <Tooltip message="复制代码">
      <Button on:click={handleCopy}>
        <Icon
          name={copyIcon}
          className={copyIcon === 'check' ? '_gk-qkinit-code-copyed' : ''}
        />
      </Button>
    </Tooltip>
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
