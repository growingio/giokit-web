<script lang="ts">
  import { Modal } from '@/components';
  import {
    _activeStorage,
    _handledIdx,
    _storageList,
    _handleType,
    refreshStorage
  } from '../../store';

  export let storages: any;

  let targetItem: any;

  $: {
    targetItem = $_storageList[$_handledIdx] ?? {};
  }

  const onDelete = () => {
    storages.removeItem(targetItem.key);
    refreshStorage();
    onCancel();
  };

  const onCancel = () => {
    _handledIdx.set(-1);
    _handleType.set('');
  };
</script>

<Modal
  visible={$_handleType === 'delete'}
  type="warning"
  title={`确定删除 ${targetItem.key} 吗？`}
  {onCancel}
  onOk={onDelete}
/>
