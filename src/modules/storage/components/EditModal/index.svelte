<script lang="ts">
  import './index.less';
  import { FormItem, Input, Modal } from '@/components';
  import {
    _activeStorage,
    _handledIdx,
    _storageList,
    _handleType,
    refreshStorage
  } from '../../store';

  export let storages: any;

  let targetItem: any = {};

  $: {
    targetItem = $_storageList[$_handledIdx] ?? {};
  }

  const onChange = (e: Event | any, k: string) => {
    targetItem[k] = e.target.value;
  };

  const onSave = () => {
    storages.setItem(targetItem.key, targetItem.value);
    // @ts-ignore
    refreshStorage();
    onCancel();
  };

  const onCancel = () => {
    _handledIdx.set(-1);
    _handleType.set('');
  };
</script>

<Modal visible={$_handleType === 'edit'} {onCancel} onOk={onSave}>
  <div class="_gk-strg-item-tool-edit">
    <div class="_gk-modal-title"><span>编辑{$_activeStorage}项</span></div>
    <div class="_gk-strg-edit-form">
      <FormItem label="名称">
        <Input
          value={targetItem.key ?? ''}
          on:change={(e) => onChange(e, 'key')}
        />
      </FormItem>
      <FormItem label="值">
        <Input
          value={targetItem.value ?? ''}
          on:change={(e) => onChange(e, 'value')}
        />
      </FormItem>
    </div>
  </div>
</Modal>
