<script lang="ts">
  import Popover from '@/components/Popover/index.svelte';
  import './index.less';
  import {
    _activeReqType,
    _gioRequestQueue,
    _requestQueue,
    _clearVisible,
    _filterVisible,
    _filterActive,
    _monitorVisible
  } from '../../store';
  import { isEmpty } from '@/utils/glodash';
  import Button from '@/components/Button/index.svelte';
  import Icon from '@/components/Icon/index.svelte';
  import Divider from '@/components/Divider/index.svelte';
  import Checkbox from '@/components/Checkbox/index.svelte';
  import { GIOEVENTTYPES } from '@/constants/constants';
  import { onDestroy, onMount } from 'svelte';
  import { Unsubscriber } from 'svelte/store';

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
    _monitorVisible.set(false);
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

<div class="_gk-nw-tool">
  <Popover triggerSelector="#_gk-nw-tool-filter" bind:this={popInst}>
    <Button
      slot="trigger"
      id="_gk-nw-tool-filter"
      on:click={handleFilter}
      disabled={isEmpty($_gioRequestQueue)}
    >
      <Icon name="filter" />
    </Button>
    <div slot="popper" class="_gk-nw-tool-filter-content">
      <div class="_gk-nw-tool-filter-head">
        筛选事件类型
        <Checkbox
          on:change={(e) => handleAll(e)}
          indeterminate={!isEmpty(active) &&
            active.length < GIOEVENTTYPES.length}
          checked={active.length === GIOEVENTTYPES.length}
          >全选
        </Checkbox>
      </div>
      <div class="_gk-nw-tool-filter-groups">
        {#each GIOEVENTTYPES as item, i}
          <Checkbox
            checked={active.includes(item)}
            className={i === GIOEVENTTYPES.length - 1
              ? '_gk-nw-tool-filter-groups-span-2'
              : ''}
            on:change={(e) => checkChange(e, item)}
            >{item}
          </Checkbox>
        {/each}
      </div>
      <Divider />
      <div class="_gk-f-btns">
        <Button small on:click={() => _filterVisible.set(false)}>取消</Button>
        <Button small type="primary" on:click={onFilter}>确定</Button>
      </div>
    </div>
  </Popover>
</div>
