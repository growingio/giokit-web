<script lang="ts">
  import { isObject, isArray, isEmpty } from "@/utils/glodash";
  import { onMount, onDestroy } from "svelte";
  import Empty from "@/components/Empty/index.svelte";
  import JsonViewItemArray from "./JsonViewItemArray.svelte";
  import JsonViewItemObject from "./JsonViewItemObject.svelte";
  import  "./index.less";

  onMount(() => {
  });

  onDestroy(() => {
  });

  export let data: any = {};
</script>

<div class="_gk-jsonview">
  {#if !isEmpty(data) && (isArray(data) || isObject(data))}
    {#if isArray(data)}
      <JsonViewItemArray {data} />
    {:else}
      <JsonViewItemObject {data} />
    {/if}
  {:else}
    <div class="flex justify-around h-full">
      <Empty />
    </div>
  {/if}
</div>
