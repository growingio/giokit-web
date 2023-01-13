import { isString } from '@/utils/glodash';
import {
  genResonseByResponseType,
  genFormattedBody,
  getURL,
  guid
} from '@/utils/tools';
import { getDurationColor, RequestItem, RequestMethod } from '../model';

export class ResponseProxyHandler<T extends Response>
  implements ProxyHandler<T>
{
  public resp: Response;
  public item: RequestItem;
  protected updateRequestItem: any;

  constructor(resp: T, item: RequestItem, onUpdateCallback: any) {
    // console.log('Proxy: new constructor')
    this.resp = resp;
    this.item = item;
    this.updateRequestItem = onUpdateCallback;
    this.mockReader();
  }

  public set(target: T, key: string, value: any) {
    // if (typeof key === 'string') { console.log('Proxy set:', key) }
    return Reflect.set(target, key, value);
  }

  public get(target: T, key: string) {
    // if (typeof key === 'string') { console.log('[Fetch.proxy] get:', key) }
    const value = Reflect.get(target, key);
    switch (key) {
      case 'arrayBuffer':
      case 'blob':
      case 'formData':
      case 'json':
      case 'text':
        return () => {
          this.item.responseType = <any>key.toLowerCase();
          // @ts-ignore
          return value.apply(target).then((resp: any) => {
            this.item.response = genResonseByResponseType(
              this.item.responseType as string,
              resp
            );
            this.updateRequestItem(this.item);
            return resp;
          });
        };
    }
    if (typeof value === 'function') {
      return value.bind(target);
    } else {
      return value;
    }
  }

  protected mockReader() {
    let readerReceivedValue: Uint8Array;
    if (!this.resp.body) {
      // some browsers do not return `body` in some cases, like `OPTIONS` method. (issue #531)
      return;
    }
    if (typeof this.resp.body.getReader !== 'function') {
      return;
    }
    const _getReader = this.resp.body.getReader;
    // @ts-ignore
    this.resp.body.getReader = () => {
      // console.log('[Fetch.proxy] getReader');
      const reader = <ReturnType<typeof _getReader>>(
        _getReader.apply(this.resp.body)
      );

      // when readyState is already 4,
      // it's not a chunked stream, or it had already been read.
      // so should not update status.
      // @ts-ignore
      if (this.item.readyState === 4) {
        return reader;
      }

      const _read = reader.read;
      const _cancel = reader.cancel;
      this.item.responseType = 'arraybuffer';
      // @ts-ignore
      reader.read = () => {
        // @ts-ignore
        return (<ReturnType<typeof _read>>_read.apply(reader)).then(
          (result) => {
            // console.log('[Fetch.proxy] read', result.done);
            if (!readerReceivedValue) {
              // @ts-ignore
              readerReceivedValue = new Uint8Array(result.value);
            } else {
              const newValue = new Uint8Array(
                // @ts-ignore
                readerReceivedValue.length + result.value.length
              );
              newValue.set(readerReceivedValue);
              // @ts-ignore
              newValue.set(result.value, readerReceivedValue.length);
              readerReceivedValue = newValue;
            }
            this.item.endTime = Date.now();
            this.item.duration =
              this.item.endTime - (this.item.startTime || this.item.endTime);
            this.item.durationColor = getDurationColor(this.item.duration);
            this.item.status = result.done
              ? String(this.item.status)
              : 'LOADING';
            if (result.done) {
              this.item.response = genResonseByResponseType(
                this.item.responseType as string,
                readerReceivedValue
              );
            }
            this.updateRequestItem(this.item);
            return result;
          }
        );
      };

      reader.cancel = (...args) => {
        this.item.status = 'CANCEL';
        this.item.endTime = Date.now();
        this.item.duration =
          this.item.endTime - (this.item.startTime || this.item.endTime);
        this.item.durationColor = getDurationColor(this.item.duration);
        this.item.response = genResonseByResponseType(
          this.item.responseType as string,
          readerReceivedValue
        );
        this.updateRequestItem(this.item);
        return _cancel.apply(reader, args);
      };
      return reader;
    };
  }
}

export class FetchProxyHandler<T extends typeof fetch>
  implements ProxyHandler<T>
{
  protected updateRequestItem: any;

  constructor(updateRequestItem: any) {
    this.updateRequestItem = updateRequestItem;
  }

  public apply(target: T, thisArg: typeof window, argsList: any) {
    const input: RequestInfo = argsList[0];
    const init: RequestInit = argsList[1];
    // @ts-ignore
    const item: RequestItem = {
      _id: guid(),
      type: 'fetch'
    };
    this.beforeFetch(item, input, init);

    return (<ReturnType<T>>target.apply(window, argsList))
      .then(this.afterFetch(item))
      .catch((e) => {
        // mock finally
        item.error = e.message;
        item.status = 'ERROR';
        item.endTime = Date.now();
        item.duration = item.endTime - (item.startTime || item.endTime);
        item.durationColor = getDurationColor(item.duration);
        this.updateRequestItem(item);
        throw e;
      });
  }

  protected beforeFetch(
    item: RequestItem,
    input: RequestInfo,
    init?: RequestInit
  ) {
    let parsedURL: URL,
      method = 'GET',
      requestHeader: any;
    // handle `input` content
    if (isString(input)) {
      // when `input` is a string
      method = init?.method || 'GET';
      parsedURL = getURL(<string>input);
      requestHeader = init?.headers;
    } else {
      // when `input` is a `Request` object
      method = (<Request>input).method || 'GET';
      parsedURL = getURL((<Request>input).url);
      requestHeader = (<Request>input).headers;
    }

    item.method = <RequestMethod>method;
    item.headers = requestHeader;
    item.url = parsedURL.toString();
    item.name = (parsedURL.pathname.split('/').pop() || '') + parsedURL.search;
    item.params = parsedURL.searchParams.toString();
    item.status = 'PENDING';
    if (!item.startTime) {
      // UNSENT
      item.startTime = Date.now();
    }

    if (Object.prototype.toString.call(requestHeader) === '[object Headers]') {
      item.headers = {};
      for (const [key, value] of <Headers>requestHeader) {
        item.headers[key] = value;
      }
    } else {
      item.headers = requestHeader;
    }

    // save POST data
    if (init?.body) {
      item.body = genFormattedBody(init.body);
    }

    this.updateRequestItem(item);
  }

  protected afterFetch(item: any) {
    const then = (resp: Response) => {
      item.endTime = Date.now();
      item.duration = item.endTime - (item.startTime || item.endTime);
      item.durationColor = getDurationColor(item.duration);
      item.status = String(resp.status);

      let isChunked = false;
      item.header = {};
      for (const [key, value] of resp.headers) {
        item.header[key] = value;
        isChunked =
          value.toLowerCase().indexOf('chunked') > -1 ? true : isChunked;
      }
      // console.log('[Fetch.proxy] afterFetch', 'isChunked:', isChunked, resp.status);

      if (isChunked) {
        // when `transfer-encoding` is chunked, the response is a stream which is under loading,
        // so the `readyState` should be 3 (Loading),
        // and the response should NOT be `clone()` which will affect stream reading.
        item.readyState = 3;
      } else {
        // Otherwise, not chunked, the response is not a stream,
        // so it's completed and can be `clone()` for `text()` calling.
        item.readyState = 4;

        this.handleResponseBody(resp.clone(), item).then(
          (responseValue: string | ArrayBuffer) => {
            item.response = genResonseByResponseType(
              item.responseType,
              responseValue
            );
            this.updateRequestItem(item);
          }
        );
      }

      this.updateRequestItem(item);
      return new Proxy(
        resp,
        new ResponseProxyHandler(resp, item, this.updateRequestItem)
      );
    };
    return then;
  }

  protected handleResponseBody(resp: Response, item: RequestItem) {
    // parse response body by Content-Type
    const contentType = resp.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      item.responseType = 'json';
      return resp.text();
    } else if (
      contentType &&
      (contentType.includes('text/html') || contentType.includes('text/plain'))
    ) {
      item.responseType = 'text';
      return resp.text();
    } else {
      item.responseType = 'arraybuffer';
      return resp.arrayBuffer();
    }
  }
}

export class FetchProxy {
  public static origFetch = fetch;

  public static create(updateRequestItem: any) {
    return new Proxy(fetch, new FetchProxyHandler(updateRequestItem));
  }
}
