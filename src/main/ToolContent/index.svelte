<script lang="ts">
  import './index.less';
  import { _activeTool } from '../store';
  import Debugger from '../../modules/debugger/index.svelte';
  import CustomEvents from '../../modules/customEvents/index.svelte';
  import InitVerification from '../../modules/initVerification/index.svelte';
  import Log from '../../modules/log/index.svelte';
  import Network from '../../modules/network/index.svelte';
  import QuickInit from '../../modules/quickInit/index.svelte';
  import RunningState from '../../modules/runningState/index.svelte';
  import Storage from '../../modules/storage/index.svelte';
  import System from '../../modules/system/index.svelte';

  /**
   * Inner properties
   */
  const TOOL_COMPONENTS: any = {
    'custom-events': CustomEvents,
    'init-verification': InitVerification,
    'quick-init': QuickInit,
    'running-state': RunningState,
    debugger: Debugger,
    log: Log,
    network: Network,
    storage: Storage,
    system: System,
  };
</script>

<div class="_gk-content">
  <svelte:component this={TOOL_COMPONENTS[$_activeTool]} />
</div>
