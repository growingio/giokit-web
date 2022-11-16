<script lang="ts">
  import { onDestroy } from 'svelte';
  import Icon from '@/components/Icon/index.svelte';

  import { _activeTool } from '../store';
  import { commonTools, platformTools } from '../constants';

  import './index.less';

  /**
   * Inner properties
   */
  let toolInfo;

  const unsubscribe = _activeTool.subscribe((acKey: string) => {
    toolInfo = [...commonTools, ...platformTools].find(
      (o: any) => o.key == acKey
    );
  });

  /**
   * Lifecycle
   */
  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class="_gk-content">
  <div class="_gk-content-head">
    <Icon name={toolInfo.icon} />
    {toolInfo.label}
  </div>
  <div class="_gk-content-body" />
</div>
