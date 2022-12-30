import { _requestQueue, _gioRequestQueue } from './store';
import { BeaconProxy } from './proxy/beacon.proxy';
import { FetchProxy } from './proxy/fetch.proxy';
import { genFormattedBody, niceTry } from '@/utils/tools';
import { get } from 'svelte/store';
import { head, isArray } from '@/utils/glodash';
import { LZString } from './compress';
import { XHRProxy } from './proxy/xhr.proxy';

export type RequestMethod =
  | ''
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'HEAD'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';

export interface RequestItem {
  _id: string;
  type: 'XMLHttpRequest' | 'fetch' | 'ping';
  name: string;
  url: string;
  method: RequestMethod;
  status: number | string;
  error?: any;
  headers: { [key: string]: string };
  body: any;
  params: string;
  startTime: number;
  endTime: number;
  duration: number;
  durationColor?: string;
  isGioData?: boolean;
  gioEventType?: string;
  gioEventName?: string;
  gioEventGsid?: string | number;
  gioPreviewPath?: string;
  gioPreviewXpath?: string;
}

export default class NetworkModel {
  private originXMLHttpRequest: any;
  private originFetch: any;
  private originSendBeacon: any;
  public observer: any;

  constructor() {
    this.mockXHR();
    this.mockFetch();
    this.mockSendBeacon();
    this.initPerformance();
  }

  // 请求时长监控
  initPerformance = () => {
    this.observer = new window.PerformanceObserver((list) => {
      // 通过性能监控获取请求相对准确的时长
      const requstTiming = head(list.getEntries());
      if (
        ['xmlhttprequest', 'fetch', 'beacon'].includes(
          requstTiming.initiatorType
        )
      ) {
        const targetIndex = (get(_requestQueue) as any).findLastIndex(
          (o: RequestItem) => o.url === requstTiming.name
        );
        _requestQueue.update((o) => {
          const m = [...o];
          const target: RequestItem = m[targetIndex];
          if (target) {
            target.duration = requstTiming.duration;
            target.durationColor = getDurationColor(target.duration);
          }
          return m;
        });
      }
    });
    this.observer.observe({
      entryTypes: ['resource']
    });
  };

  /**
   * mock XMLHttpRequest
   * @private
   */
  private mockXHR() {
    if (!window.hasOwnProperty('XMLHttpRequest')) {
      return;
    }
    window.XMLHttpRequest = XHRProxy.create((item: RequestItem) => {
      this.updateRequestItem(item);
    });
  }

  /**
   * mock fetch request
   * @private
   */
  private mockFetch() {
    if (!window.hasOwnProperty('fetch')) {
      return;
    }
    window.fetch = FetchProxy.create((item: RequestItem) => {
      this.updateRequestItem(item);
    });
  }

  /**
   * mock navigator.sendBeacon
   * @private
   */
  private mockSendBeacon() {
    if (!window.navigator.sendBeacon) {
      return;
    }
    window.navigator.sendBeacon = BeaconProxy.create((item: RequestItem) => {
      this.updateRequestItem(item);
    });
  }

  public unMock() {
    // recover original functions
    if (window.hasOwnProperty('XMLHttpRequest')) {
      window.XMLHttpRequest = XHRProxy.origXMLHttpRequest;
    }
    if (window.hasOwnProperty('fetch')) {
      window.fetch = FetchProxy.origFetch;
    }
    if (!!window.navigator.sendBeacon) {
      window.navigator.sendBeacon = BeaconProxy.origSendBeacon;
    }
  }

  // 更新请求队列
  updateRequestItem = (requestItem: RequestItem) => {
    if (requestItem.isGioData) {
      if (isArray(requestItem.body)) {
        requestItem.gioEventType = head(requestItem.body).eventType;
        requestItem.gioEventName = head(requestItem.body).eventName;
        requestItem.gioEventGsid = head(requestItem.body).globalSequenceId;
        const path = head(requestItem.body).path;
        requestItem.gioPreviewPath =
          path && path.length > 18
            ? `...${path.substring(path.length, path.length - 18)}`
            : path ?? '';
        const xpath = head(requestItem.body).xpath;
        requestItem.gioPreviewXpath =
          xpath && xpath.length > 18
            ? `...${xpath.substring(xpath.length, xpath.length - 18)}`
            : xpath ?? '';
      }
      _gioRequestQueue.update((l: RequestItem[]) => {
        const tl = [...l];
        const idx = l.findIndex((o) => o._id === requestItem._id);
        // 有相同id的请求则更新请求内容
        if (idx > -1) {
          tl[idx] = requestItem;
          return tl;
        } else {
          // 不存在则推入队列
          return [...l, requestItem];
        }
      });
    }
    _requestQueue.update((l: RequestItem[]) => {
      const tl = [...l];
      const idx = l.findIndex((o) => o._id === requestItem._id);
      if (idx > -1) {
        tl[idx] = requestItem;
        return tl;
      } else {
        return [...l, requestItem];
      }
    });
  };

  // 恢复请求的hook逻辑
  public unHook() {
    if (window.hasOwnProperty('XMLHttpRequest')) {
      window.XMLHttpRequest = this.originXMLHttpRequest;
    }
    if (window.hasOwnProperty('fetch')) {
      window.fetch = this.originFetch;
    }
    if (!!window.navigator.sendBeacon) {
      window.navigator.sendBeacon = this.originSendBeacon;
    }
  }
}

// 判断是否为Gio的上报请求
export const isGio = (url: string) => {
  const { host, projectId } = (window as any).vds;
  return url.indexOf(host) > -1 && url.indexOf(`${projectId}/collect`) > -1;
};

// 获取格式化后的请求body
export const getFormattedBody = (body: any, isGioData: boolean = false) => {
  if (isGioData) {
    const ret = LZString.decompressFromUint8Array(body) || body;
    return niceTry(() => JSON.parse(ret)) ?? ret;
  } else {
    return genFormattedBody(body);
  }
};

// 获取请求时长颜色
export const getDurationColor = (d: string | number) => {
  let n: number | string = Number(d);
  if (!isNaN(n)) {
    if (n < 1000) {
      n = 'green';
    } else if (n >= 1000 && n < 5000) {
      n = 'yellow';
    } else {
      n = 'red';
    }
    return n;
  } else {
    return 'normal';
  }
};
