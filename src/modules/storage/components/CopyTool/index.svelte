<script lang="ts">
  import './index.less';
  import { _activeStorage, _handledIdx, _storageList } from '../../store';
  import { Icon } from '@/components';
  import copy from 'copy-text-to-clipboard';

  let copyIcon: 'copy' | 'check' | 'close' = 'copy';

  const onCopy = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const targetItem: any = $_storageList[$_handledIdx];
      copy(`${targetItem.key}=${targetItem.value}`, {
        target: document.documentElement
      });
      copyIcon = 'check';
    } catch (error) {
      copyIcon = 'close';
    }
    window.setTimeout(() => {
      copyIcon = 'copy';
      _handledIdx.set(-1);
    }, 800);
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class="_gk-strg-item-tool" title="复制" on:click={onCopy}>
  <Icon
    name={copyIcon}
    className={copyIcon === 'check' ? '_gk-storage-list-item-copyed' : ''}
  />
</span>
