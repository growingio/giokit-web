<script lang="ts">
  import { fixed } from '@/utils/glodash';
  import './index.less';

  export let item: any = {};

  // 格式化请求时长
  const durationFormat = (d: string | number) => {
    let n: number | string = Number(d);
    if (!isNaN(n)) {
      if (n < 1000) {
        n = `${fixed(n, 0)}ms`;
      } else if (n >= 1000 && n < 1000000) {
        n = `${fixed(n / 1000, 2)}s`;
      } else {
        n = `${fixed(n / 1000 / 60, 2)}min`;
      }
      return n;
    } else {
      return '-';
    }
  };
</script>

<span class={`_gk-network-item-${item.durationColor}`}>
  {durationFormat(item.duration)}
</span>
