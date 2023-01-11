<script lang="ts">
  import { Badge, Button, Divider, Icon, Input, Popover } from '@/components';
  import { _searchVisible, _searchValue } from '../../store';
  import './index.less';

  let popInst: any;
  let searchValue: string;

  $: {
    if (!$_searchVisible) {
      popInst?.hide();
    }
  }

  const handleSearch = () => {
    _searchVisible.set(!$_searchVisible);
  };

  const onInputChange = (e: any) => {
    searchValue = e.target?.value ?? '';
  };

  const onKeyDown = (e: any) => {
    // 回车
    if (e.keyCode == 13 && e.key === 'Enter') {
      onSearch(searchValue);
    }
  };

  // 确认要搜索，保存搜索值
  const onSearch = (v: string) => {
    _searchValue.set(v);
    _searchVisible.set(false);
  };
</script>

<div class="_gk-log-tool">
  <Popover triggerSelector="#_gk-log-tool-search" bind:this={popInst}>
    <Badge dot={!!$_searchValue} slot="trigger">
      <Button id="_gk-log-tool-search" on:click={handleSearch}>
        <Icon name="search" />
      </Button>
    </Badge>
    <div slot="popper" class="_gk-log-tool-search-pop">
      <Input
        placeholder="请输入搜索内容..."
        on:input={onInputChange}
        on:change={onInputChange}
        on:keydown={onKeyDown}
      />
      <Divider />
      <div class="_gk-f-btns">
        <Button small on:click={() => _searchVisible.set(false)}>取消</Button>
        <Button small type="primary" on:click={() => onSearch(searchValue)}>
          搜索
        </Button>
      </div>
    </div>
  </Popover>
</div>
