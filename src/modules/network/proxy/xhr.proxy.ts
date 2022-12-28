import { genFormattedBody, getURL, guid } from '@/utils/tools';
import { getDurationColor, RequestItem } from '../model';

export class XHRProxyHandler<T extends XMLHttpRequest>
  implements ProxyHandler<T>
{
  public XMLReq: XMLHttpRequest;
  public item: RequestItem;
  protected updateRequestItem: any;

  constructor(XMLReq: XMLHttpRequest, updateRequestItem: any) {
    this.XMLReq = XMLReq;
    this.XMLReq.onreadystatechange = () => {
      this.onReadyStateChange();
    };
    this.XMLReq.onabort = () => {
      this.onAbort();
    };
    this.XMLReq.ontimeout = () => {
      this.onTimeout();
    };
    this.XMLReq.onerror = () => {
      this.onError();
    };
    // @ts-ignore
    this.item = {
      _id: guid(),
      type: 'XMLHttpRequest'
    };
    this.updateRequestItem = updateRequestItem;
  }

  public get(target: T, key: string) {
    // if (typeof key === 'string') { console.log('Proxy get:', typeof key, key); }
    switch (key) {
      case 'open':
        return this.getOpen(target);

      case 'send':
        return this.getSend(target);

      case 'setRequestHeader':
        return this.getSetRequestHeader(target);

      default:
        const value = Reflect.get(target, key);
        if (typeof value === 'function') {
          return value.bind(target);
        } else {
          return value;
        }
    }
  }

  public set(target: T, key: string, value: any) {
    // if (typeof key === 'string') { console.log('Proxy set:', typeof key, key); }
    switch (key) {
      case 'onreadystatechange':
        return this.setOnReadyStateChange(target, key, value);

      case 'onabort':
        return this.setOnAbort(target, key, value);

      case 'ontimeout':
        return this.setOnTimeout(target, key, value);

      default:
      // do nothing
    }
    return Reflect.set(target, key, value);
  }

  public onReadyStateChange() {
    this.item.status = this.XMLReq.readyState;
    this.item.endTime = Date.now();
    this.item.duration = this.item.endTime - this.item.startTime;
    this.item.durationColor = getDurationColor(this.item.duration);

    // update data by readyState
    this.updateItemByReadyState();
    this.triggerUpdate();
  }

  public onAbort() {
    // console.log('Proxy onAbort()')
    this.item.status = 'ABORT';
    this.triggerUpdate();
  }

  public onTimeout() {
    this.item.status = 'TIMEOUT';
    this.triggerUpdate();
  }

  public onError() {
    this.item.status = 'ERROR';
    this.triggerUpdate();
  }

  protected triggerUpdate() {
    this.updateRequestItem(this.item);
  }

  protected getOpen(target: T) {
    const targetFunction = Reflect.get(target, 'open');
    return (...args: any[]) => {
      // console.log('Proxy open()');
      const method = args[0];
      const parsedURL = getURL(args[1]);
      this.item.method = method ? method.toUpperCase() : 'GET';
      this.item.url = parsedURL.toString();
      this.item.name =
        (parsedURL.pathname.split('/').pop() || '') + parsedURL.search;
      this.item.params = parsedURL.searchParams.toString();
      this.triggerUpdate();
      // @ts-ignore
      return targetFunction.apply(target, args);
    };
  }

  protected getSend(target: T) {
    const targetFunction = Reflect.get(target, 'send');
    return (...args: any[]) => {
      // console.log('Proxy send()');
      const data: XMLHttpRequestBodyInit = args[0];
      this.item.body = genFormattedBody(data);
      this.triggerUpdate();
      // @ts-ignore
      return targetFunction.apply(target, args);
    };
  }

  protected getSetRequestHeader(target: T) {
    const targetFunction = Reflect.get(target, 'setRequestHeader');
    return (...args: any[]) => {
      if (!this.item.headers) {
        this.item.headers = {};
      }
      this.item.headers[args[0]] = args[1];
      this.triggerUpdate();
      // @ts-ignore
      return targetFunction.apply(target, args);
    };
  }

  protected setOnReadyStateChange(target: T, key: string, value: any) {
    return Reflect.set(target, key, (...args: any[]) => {
      this.onReadyStateChange();
      value.apply(target, args);
    });
  }

  protected setOnAbort(target: T, key: string, value: any) {
    return Reflect.set(target, key, (...args: any[]) => {
      value.apply(target, args);
    });
  }

  protected setOnTimeout(target: T, key: string, value: any) {
    return Reflect.set(target, key, (...args: any[]) => {
      value.apply(target, args);
    });
  }

  /**
   * Update item's properties according to readyState.
   */
  protected updateItemByReadyState() {
    switch (this.XMLReq.readyState) {
      case 0: // UNSENT
      case 1: // OPENED
        this.item.status = 'Pending';
        if (!this.item.startTime) {
          this.item.startTime = Date.now();
        }
        break;

      case 2: // HEADERS_RECEIVED
        this.item.status = 'Loading';
        this.item.headers = {};
        const header = this.XMLReq.getAllResponseHeaders() || '',
          headerArr = header.split('\n');
        // extract plain text to key-value format
        for (let i = 0; i < headerArr.length; i++) {
          const line = headerArr[i];
          if (!line) {
            continue;
          }
          const arr = line.split(': ');
          const key = arr[0];
          const value = arr.slice(1).join(': ');
          this.item.headers[key] = value;
        }
        break;

      case 3: // LOADING
        this.item.status = 'Loading';
        break;

      case 4: // DONE
        // `XMLReq.abort()` will change `status` from 200 to 0, so use previous value in this case
        this.item.status = this.XMLReq.status || this.item.status || 0;
        this.item.endTime = Date.now();
        this.item.duration =
          this.item.endTime - (this.item.startTime || this.item.endTime);
        this.item.durationColor = getDurationColor(this.item.duration);
        break;

      default:
        this.item.status = this.XMLReq.status || 'Unknown';
        break;
    }
  }
}

export class XHRProxy {
  public static origXMLHttpRequest = XMLHttpRequest;

  public static create(updateRequestItem: any) {
    return new Proxy(XMLHttpRequest, {
      construct(ctor) {
        const XMLReq = new ctor();
        return new Proxy(
          XMLReq,
          new XHRProxyHandler(XMLReq, updateRequestItem)
        );
      }
    });
  }
}
