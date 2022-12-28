import { guid, getURL } from '@/utils/tools';
import {
  RequestItem,
  isGio,
  getFormattedBody,
  getDurationColor
} from '../model';

// https://fetch.spec.whatwg.org/#concept-bodyinit-extract
const getContentType = (data?: BodyInit) => {
  if (data instanceof Blob) {
    return data.type;
  }
  if (data instanceof FormData) {
    return 'multipart/form-data';
  }
  if (data instanceof URLSearchParams) {
    return 'application/x-www-form-urlencoded;charset=UTF-8';
  }
  return 'text/plain;charset=UTF-8';
};

export class BeaconProxyHandler<T extends typeof navigator.sendBeacon>
  implements ProxyHandler<T>
{
  protected updateRequestItem;

  constructor(updateRequestItem: any) {
    this.updateRequestItem = updateRequestItem;
  }

  public apply(target: T, thisArg: T, argsList: any[]) {
    const parsedURL = getURL(argsList[0]);
    const isGioData = isGio(parsedURL.toString());
    const data: BodyInit = argsList[1];

    const item: RequestItem = {
      _id: guid(),
      type: 'ping',
      method: 'POST',
      url: parsedURL.toString(),
      name: (parsedURL.pathname.split('/').pop() || '') + parsedURL.search,
      headers: { 'Content-Type': getContentType(data) },
      startTime: Date.now(),
      status: 0,
      params: parsedURL.searchParams.toString(),
      body: getFormattedBody(data, isGioData),
      endTime: 0,
      duration: 0,
      isGioData
    };

    // @ts-ignore
    const isSuccess = target.apply(thisArg, argsList);
    if (isSuccess) {
      item.endTime = Date.now();
      item.duration = item.endTime - item.startTime;
      item.durationColor = getDurationColor(item.duration);
      item.status = 'OK';
    } else {
      item.status = 'ERROR';
    }
    this.updateRequestItem(item);
    return isSuccess;
  }
}

export class BeaconProxy {
  public static origSendBeacon = navigator.sendBeacon;

  public static create(updateRequestItem: any) {
    return new Proxy(
      navigator.sendBeacon,
      new BeaconProxyHandler(updateRequestItem)
    );
  }
}
