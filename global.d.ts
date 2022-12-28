interface IGrowingWebViewJavascriptBridge {
  configuration: any;
  getConfiguration: () => any;
  setNativeUserId: (userId: string) => void;
  setNativeUserIdAndUserKey: (userId: string, userKey?: string) => void;
  clearNativeUserId: () => void;
  clearNativeUserIdAndUserKey: () => void;
  [key: string]: any;
}

declare interface Window {
  _gr_ignore_local_rule: boolean;
  ActiveXObject?: any;
  analytics?: any;
  collectEvent?: any;
  dataLayer?: any;
  ga?: any;
  gdp: any;
  gio: any;
  google_tag_manager?: any;
  GrowingWebViewJavascriptBridge: IGrowingWebViewJavascriptBridge;
  gtag?: any;
  vds: any;
  XDomainRequest: any;
}

declare module 'tippy.js';
declare module 'js-cookie';
declare module 'querystringify';
declare module 'prismjs';
