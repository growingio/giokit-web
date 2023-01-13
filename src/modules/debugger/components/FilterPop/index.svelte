<script lang="ts">
  import './index.less';
  import { _activeReqType, _requestQueue } from '../../../network/store';
  import { GIOEVENTTYPES } from '@/constants/constants';
  import { isEmpty } from '@/utils/glodash';
  import { onDestroy, onMount } from 'svelte';
  import { Unsubscriber } from 'svelte/store';
  import {
    _clearVisible,
    _filterVisible,
    _filterActive,
    _gioRequestQueue
  } from '../../store';
  import { Badge, Button, Checkbox, Icon, Popover } from '@/components';

  let active: string[] = [...GIOEVENTTYPES];

  let unsubscribe: Unsubscriber;

  let popInst: any;

  $: {
    if (!$_filterVisible) {
      popInst?.hide();
    }
  }

  onMount(() => {
    unsubscribe = _filterActive.subscribe((v) => {
      active = v;
    });
  });

  onDestroy(() => {
    unsubscribe();
  });

  const handleFilter = () => {
    _clearVisible.set(false);
    _filterVisible.set(!$_filterVisible);
  };

  const handleAll = (e: any) => {
    const { checked } = e.detail;
    if (checked) {
      active = GIOEVENTTYPES;
    } else {
      active = [];
    }
  };

  const checkChange = (e: any, v: string) => {
    const { checked } = e.detail;
    if (checked) {
      active.push(v);
      active = Array.from(new Set(active));
    } else {
      active = active.filter((o) => o !== v);
    }
  };

  const onFilter = () => {
    _filterActive.set(active);
    _filterVisible.set(false);
  };
</script>

<div class="_gk-module-tool">
  <Popover triggerSelector="#_gk-module-tool-filter" bind:this={popInst}>
    <Badge slot="trigger" dot={$_filterActive.length !== GIOEVENTTYPES.length}>
      <Button id="_gk-module-tool-filter" on:click={handleFilter}>
        <Icon name="filter" />
      </Button>
    </Badge>
    <div slot="popper" class="_gk-module-tool-filter-content">
      <div class="_gk-module-tool-filter-head">
        筛选事件类型
        <Checkbox
          on:change={(e) => handleAll(e)}
          indeterminate={!isEmpty(active) &&
            active.length < GIOEVENTTYPES.length}
          checked={active.length === GIOEVENTTYPES.length}
          >全选
        </Checkbox>
      </div>
      <div class="_gk-module-tool-filter-groups">
        {#each GIOEVENTTYPES as item, i}
          <Checkbox
            checked={active.includes(item)}
            className={i === GIOEVENTTYPES.length - 1
              ? '_gk-module-tool-filter-groups-span-2'
              : ''}
            on:change={(e) => checkChange(e, item)}
            >{item}
          </Checkbox>
        {/each}
      </div>
      <div class="_gk-f-btns">
        <Button small on:click={() => _filterVisible.set(false)}>取消</Button>
        <Button small type="primary" on:click={onFilter}>确定</Button>
      </div>
    </div>
  </Popover>
</div>
