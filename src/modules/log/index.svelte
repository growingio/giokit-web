<script lang="ts">
  import { Unsubscriber } from 'svelte/store';
  import './index.less';
  import {
    _activeTab,
    _logQueue,
    _clearVisible,
    _searchVisible,
    _commandVisble,
    _searchValue
  } from './store';
  import {
    compact,
    head,
    isArray,
    isEmpty,
    isNil,
    isNumber,
    isObject,
    isString,
    keys
  } from '@/utils/glodash';
  import { Tabs } from '@/components';
  import LogRow from './components/LogRow/index.svelte';
  import { onDestroy, onMount } from 'svelte';
  import ClearPop from './components/ClearPop/index.svelte';
  import SearchPop from './components/SearchPop/index.svelte';
  import CommandPop from './components/CommandPop/index.svelte';

  const logsTabs = [
    { key: 'all', label: 'All' },
    { key: 'gio', label: 'GIO' },
    { key: 'log', label: 'Log' },
    { key: 'info', label: 'Info' },
    { key: 'warn', label: 'Warn' },
    { key: 'error', label: 'Error' }
  ];

  let classifiedList: any = {};
  let searchedList: any = {};
  let unsubscribe_activeTab: Unsubscriber;
  let unsubscribe_logQueue: Unsubscriber;
  let unsubscribe_searchValue: Unsubscriber;

  onMount(() => {
    classifyLogs($_logQueue, $_activeTab);

    unsubscribe_activeTab = _activeTab.subscribe((t: string) => {
      if (isNil(classifiedList[t]) || isEmpty(classifiedList[t])) {
        classifyLogs($_logQueue, t);
      }
    });
    unsubscribe_logQueue = _logQueue.subscribe((l: any[]) => {
      if (isEmpty(l)) {
        classifiedList = {};
        searchedList = {};
      } else {
        keys(classifiedList).forEach((k) => {
          if (k !== $_activeTab) {
            classifiedList[k] = [];
          }
        });
        classifyLogs(l, $_activeTab);
      }
    });
    unsubscribe_searchValue = _searchValue.subscribe(() => {
      searchLog();
    });
  });

  onDestroy(() => {
    unsubscribe_activeTab();
    unsubscribe_logQueue();
    unsubscribe_searchValue();
  });

  const onTabsChange = (active: string) => {
    _activeTab.set(active);
    handleOut();
  };

  // 对完整的日志列表根据当前的tab类型进行分类过滤
  const classifyLogs = (l: any[], t: string) => {
    if (!isEmpty(l)) {
      switch (t) {
        case 'all':
          classifiedList[t] = l;
          break;
        case 'gio': {
          classifiedList[t] = l.filter((o: any) => {
            const rowData = o.data;
            if (
              head(rowData) &&
              head(rowData)?.oData &&
              isString(head(rowData)?.oData) &&
              (head(rowData)?.oData?.indexOf('[GrowingIO') > -1 ||
                head(rowData)?.oData?.indexOf('[GioNode]') > -1)
            ) {
              return true;
            } else {
              return false;
            }
          });
          break;
        }
        case 'log':
        case 'info':
        case 'warn':
        case 'error': {
          classifiedList[t] = l.filter((o: any) => o.type === t);
          break;
        }
        default:
          break;
      }
      searchLog();
    }
  };

  // 点击空白处（实际是列表的面积）关闭popover
  const handleOut = (e?: Event) => {
    e?.preventDefault();
    e?.stopPropagation();
    _clearVisible.set(false);
    _searchVisible.set(false);
    _commandVisble.set(false);
  };

  // 根据搜索值搜索过滤日志
  const searchLog = () => {
    if ($_searchValue) {
      searchedList[$_activeTab] = classifiedList[$_activeTab].filter(
        (logItem: any) => {
          const trues = compact(
            logItem.data.map((log: any) => {
              // 对象就只检查所有的key
              if (isObject(log.oData)) {
                const objTrues = compact(
                  keys({ ...log.oData }).map(
                    (k: any) => k.indexOf($_searchValue) > -1
                  )
                );
                return objTrues.length > 0;
              }
              // 数据就只检查类型为string或number的项
              if (isArray(log.oData)) {
                const arrTrues = compact(
                  log.oData.map((v: any) => {
                    if (isNumber(v) || isString(v)) {
                      return v.toString().indexOf($_searchValue) > -1;
                    } else {
                      return false;
                    }
                  })
                );
                return arrTrues.length > 0;
              }
              // 字符串或者数字
              if (isNumber(log.oData) || isString(log.oData)) {
                return log.oData.toString().indexOf($_searchValue) > -1;
              } else {
                return false;
              }
            })
          );
          return trues.length > 0;
        }
      );
    }
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="_gk-log">
  <Tabs items={logsTabs} defaultActive={$_activeTab} onChange={onTabsChange} />
  <div class="_gk-log-container" on:click={handleOut}>
    {#each ($_searchValue ? searchedList[$_activeTab] : classifiedList[$_activeTab]) || [] as item}
      <LogRow logItem={item} />
    {/each}
  </div>
  <div class="_gk-module-tools">
    <CommandPop />
    <SearchPop />
    <ClearPop />
  </div>
</div>
