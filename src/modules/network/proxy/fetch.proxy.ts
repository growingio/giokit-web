import { isString } from '@/utils/glodash';
import { genFormattedBody, getURL, guid } from '@/utils/tools';
import { getDurationColor, RequestItem, RequestMethod } from '../model';

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
      }

      this.updateRequestItem(item);
    };
    return then;
  }
}

export class FetchProxy {
  public static origFetch = fetch;

  public static create(updateRequestItem: any) {
    return new Proxy(fetch, new FetchProxyHandler(updateRequestItem));
  }
}
