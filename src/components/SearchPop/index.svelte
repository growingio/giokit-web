<script lang="ts">
  import { Badge, Button, Icon, Input, Popover } from '@/components';
  import { guid } from '@/utils/tools';
  import './index.less';

  export let _visible: any;
  export let id: string = guid();
  export let dot: boolean = false;
  export let onShow: () => void = () => {};
  export let onHide: () => void = () => {};
  export let onSearch: (value: string) => void = () => {};

  let popInst: any;
  let searchValue: string;

  $: {
    if (!$_visible) {
      popInst?.hide();
    }
  }

  const handleSearch = () => {
    const v = $_visible;
    _visible.set(!$_visible);
    if (!v) {
      onShow();
    } else {
      onHide();
    }
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
</script>

<div class="_gk-module-tool">
  <Popover triggerSelector={`#${id}`} bind:this={popInst}>
    <Badge {dot} slot="trigger">
      <Button {id} on:click={handleSearch}>
        <Icon name="search" />
      </Button>
    </Badge>
    <div slot="popper" class="_gk-module-tool-search-pop">
      <Input
        placeholder="请输入搜索内容..."
        on:input={onInputChange}
        on:change={onInputChange}
        on:keydown={onKeyDown}
      />
      <div class="_gk-f-btns">
        <Button small on:click={() => _visible.set(false)}>取消</Button>
        <Button small type="primary" on:click={() => onSearch(searchValue)}>
          搜索
        </Button>
      </div>
    </div>
  </Popover>
</div>
