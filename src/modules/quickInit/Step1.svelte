<script lang="ts">
  import FormItem from '@/components/FormItem/index.svelte';
  import Input from '@/components/Input/index.svelte';
  import Select from '@/components/Select/index.svelte';

  const schemeOptions = [
    { label: 'https://', value: 'https://' },
    { label: 'http://', value: 'http://' }
  ];
</script>

<div class="_gk-qkinit-form-step1">
  <FormItem label="AccountID"><Input placeholder="请填写AccountID" /></FormItem>
  <FormItem label="DataSourceId"
    ><Input placeholder="请填写DataSourceId" /></FormItem
  >
  <FormItem label="上报Host">
    <div class="_gk-qkinit-form-compact">
      <Select options={schemeOptions} defaultValue="https://" />
      <Input placeholder="支持域名或IP地址" />
    </div>
  </FormItem>
  <FormItem label="Web站点版本"
    ><Input placeholder="请填写Web站点版本" /></FormItem
  >
</div>
