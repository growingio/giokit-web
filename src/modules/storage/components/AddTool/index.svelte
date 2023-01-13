<script lang="ts">
  import { Button, Icon } from '@/components';
  import { _handleType, _searchVisible, _clearVisible } from '../../store';

  const handleAdd = () => {
    _handleType.set('add');
    _searchVisible.set(false);
    _clearVisible.set(false);
  };
</script>

<div class="_gk-module-tool">
  <Button on:click={handleAdd}>
    <Icon name="add" />
  </Button>
</div>
