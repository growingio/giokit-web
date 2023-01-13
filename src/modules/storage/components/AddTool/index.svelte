<script lang="ts">
  import { Button, Icon } from '@/components';
  import { _handleType } from '../../store';

  const handleAdd = () => {
    _handleType.set('add');
  };
</script>

<div class="_gk-module-tool">
  <Button on:click={handleAdd}>
    <Icon name="addto" />
  </Button>
</div>
