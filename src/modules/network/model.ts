import { _requestQueue } from './store';
import { get } from 'svelte/store';
import { guid, getURL, genFormattedBody, niceTry } from '@/utils/tools';
import { has, isNil, unset, head } from '@/utils/glodash';
import { LZString } from './compress';

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
}

/**
 * 重写对象上面的某个属性
 * @param source 需要被重写的对象
 * @param name 需要被重写对象的key
 * @param replacement 以原有的函数作为参数，执行并重写原有函数
 * @param isForced 是否强制重写（可能原先没有该属性）
 * @returns void
 */
export function rewriter(
  source: any,
  key: string,
  replacement: (...args: any[]) => any,
  isForced = false
): void {
  if (isNil(source)) return;
  if (has(source, key) || isForced) {
    const original = source[key];
    const wrapped = replacement(original);
    if (typeof wrapped === 'function') {
      source[key] = wrapped;
    }
  }
}

export default class NetworkModel {
  private originXMLHttpRequest: any;
  private originFetch: any;
  private originSendBeacon: any;
  public observer: any;

  constructor() {
    this.hookXHR();
    this.hookFetch();
    this.hookSendBeacon();
    this.initPerformance();
  }

  // 获取当前性能时间
  getTimestamp = () => {
    if (window.performance) {
      return window.performance.now();
    } else {
      return Date.now();
    }
  };

  // 获取请求时长颜色
  getDurationColor = (d: string | number) => {
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
            target.startTime = requstTiming.fetchStart;
            target.endTime = requstTiming.responseEnd;
            target.durationColor = this.getDurationColor(target.duration);
          }
          return m;
        });
      }
    });
    this.observer.observe({
      entryTypes: ['resource']
    });
  };

  // 重写XHR
  hookXHR = () => {
    const self = this;
    this.originXMLHttpRequest = window.XMLHttpRequest;
    const originXMLHttpRequestProto = XMLHttpRequest.prototype;
    let _gioxhr: any = {};
    rewriter(originXMLHttpRequestProto, 'open', (originOpen: () => void) => {
      return function (this: any, ...args: any[]): void {
        const parsedURL = getURL(args[1]);
        this._id = guid();
        _gioxhr[this._id] = <RequestItem>{
          _id: this._id,
          type: 'XMLHttpRequest',
          name: (parsedURL.pathname.split('/').pop() || '') + parsedURL.search,
          method: args[0],
          url: parsedURL.toString(),
          startTime: self.getTimestamp(),
          status: 0,
          params: parsedURL.searchParams.toString(),
          body: {},
          endTime: 0,
          duration: 0,
          isGioData: self.isGio(parsedURL.toString())
        };
        originOpen.apply(this, args as []);
      };
    });
    rewriter(originXMLHttpRequestProto, 'send', (originSend: () => void) => {
      return function (this: any, ...args: any[]): void {
        // 在请求内部也进行时长的统计
        this.addEventListener('loadend', (event: any) => {
          if (_gioxhr[this._id]) {
            _gioxhr[this._id] = <RequestItem>{
              ..._gioxhr[this._id],
              body: self.getFormattedBody(args, _gioxhr[this._id].isGioData),
              endTime: event.timeStamp || self.getTimestamp(),
              duration:
                (event.timeStamp || self.getTimestamp()) -
                _gioxhr[this._id].startTime,
              status: this.status || 'OK'
            };
            _gioxhr[this._id].durationColor = self.getDurationColor(
              _gioxhr[this._id].duration
            );
            const requestItem: RequestItem = _gioxhr[this._id];
            self.addRequestItem(requestItem);
            unset(_gioxhr, this._id);
          }
        });
        this.addEventListener('error', (event: any) => {
          const t = event.timeStamp || self.getTimestamp();
          if (_gioxhr[this._id]) {
            _gioxhr[this._id] = <RequestItem>{
              ..._gioxhr[this._id],
              endTime: t,
              duration: t - _gioxhr[this._id].startTime,
              status: this.status || 'ERROR'
            };
            _gioxhr[this._id].durationColor = self.getDurationColor(
              _gioxhr[this._id].duration
            );
            const requestItem: RequestItem = _gioxhr[this._id];
            self.addRequestItem(requestItem);
            unset(_gioxhr, this._id);
          }
        });
        if (_gioxhr[this._id]) {
          _gioxhr[this._id].startTime = self.getTimestamp();
        }
        originSend.apply(this, args as []);
      };
    });
  };

  // 重写fetch
  hookFetch = () => {
    const self = this;
    this.originFetch = window.fetch;
    rewriter(window, 'fetch', (originFetch: () => void) => {
      return function (url: string, config: any = {}): void {
        console.log(config, 'config');
        const parsedURL = getURL(url);
        const isGioData = self.isGio(parsedURL.toString());
        let requestItem: RequestItem = {
          _id: guid(),
          type: 'fetch',
          name: (parsedURL.pathname.split('/').pop() || '') + parsedURL.search,
          method: config.method || 'GET',
          headers: config.headers || {},
          url: parsedURL.toString(),
          startTime: self.getTimestamp(),
          status: 0,
          params: parsedURL.searchParams.toString(),
          body: self.getFormattedBody(config.body, isGioData),
          endTime: 0,
          duration: 0,
          isGioData
        };
        return originFetch
          .apply(window, [url, config])
          .then((response: Response) => {
            requestItem = {
              ...requestItem,
              status: response?.status || 'OK',
              endTime: self.getTimestamp(),
              duration: self.getTimestamp() - requestItem.startTime
            };
            console.log(requestItem, 'requestItem');
            requestItem.durationColor = self.getDurationColor(
              requestItem.duration
            );
            self.addRequestItem(requestItem);
          })
          .catch((e: any) => {
            requestItem.endTime = self.getTimestamp();
            (requestItem.duration =
              self.getTimestamp() - requestItem.startTime),
              (requestItem.error = e.message);
            requestItem.status = 'ERROR';
            requestItem.durationColor = self.getDurationColor(
              requestItem.duration
            );
            self.addRequestItem(requestItem);
            throw e;
          });
      };
    });
  };

  // 重写sendBeacon
  hookSendBeacon = () => {
    const self = this;
    this.originSendBeacon = navigator.sendBeacon;
    rewriter(navigator, 'sendBeacon', (originSendBeacon: () => void) => {
      return function (url: string, data: any): void {
        const parsedURL = getURL(arguments[0]);
        const isGioData = self.isGio(parsedURL.toString());
        let requestItem: RequestItem = {
          _id: guid(),
          type: 'ping',
          name: (parsedURL.pathname.split('/').pop() || '') + parsedURL.search,
          method: 'POST',
          headers: { 'content-type': 'text/plain;charset=UTF-8' },
          url: parsedURL.toString(),
          startTime: self.getTimestamp(),
          status: 0,
          params: parsedURL.searchParams.toString(),
          body: self.getFormattedBody(data, isGioData),
          endTime: 0,
          duration: 0,
          isGioData
        };
        const res: any = originSendBeacon.apply(navigator, [url, data]);
        if (res) {
          requestItem.endTime = self.getTimestamp();
          requestItem.duration = requestItem.endTime - requestItem.startTime;
          requestItem.durationColor = self.getDurationColor(
            requestItem.duration
          );
          requestItem.status = 'OK';
        }
        self.addRequestItem(requestItem);
        return res;
      };
    });
  };

  // 判断是否为Gio的上报请求
  isGio = (url: string) => {
    const { host, projectId } = (window as any).vds;
    return url.indexOf(host) > -1 && url.indexOf(`${projectId}/collect`) > -1;
  };

  // 获取格式化后的请求body
  getFormattedBody = (body: any, isGioData: boolean = false) => {
    if (isGioData) {
      const ret = LZString.decompressFromUint8Array(body) || body;
      return niceTry(() => JSON.parse(ret)) ?? ret;
    } else {
      return genFormattedBody(body);
    }
  };

  // 简单处理后添加至队列
  addRequestItem = (requestItem: RequestItem) => {
    _requestQueue.update((o) => [...o, requestItem]);
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
