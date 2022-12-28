import { getLogDatasWithFormatting, guid } from '@/utils/tools';
import { _logQueue } from './store';

export type LOGTYPE = 'all' | 'gio' | 'log' | 'info' | 'warn' | 'error';

export type LogMethod = 'log' | 'info' | 'debug' | 'warn' | 'error';

export interface LogItem {
  _id: string;
  type: LogMethod;
  cmdType: LogMethod;
  time: number;
  data: any[];
  repeated: number;
}

export default class LogsModel {
  public readonly LOG_METHODS = ['log', 'info', 'warn', 'debug', 'error'];

  //  The original `window.console` methods.
  public origConsole: { [method: string]: Function } = {};

  constructor() {
    this.hookConsole();
  }

  /**
   * Hook `window.console` with GioKit log method.
   * Methods will be hooked only once.
   */
  public hookConsole() {
    if (typeof this.origConsole.log === 'function') {
      return;
    }

    // save original console object
    if (!window.console) {
      (<any>window.console) = {};
    } else {
      this.LOG_METHODS.map((method) => {
        this.origConsole[method] = (window.console as any)[method];
      });
      this.origConsole.time = window.console.time;
      this.origConsole.timeEnd = window.console.timeEnd;
      this.origConsole.clear = window.console.clear;
    }

    this._hookConsoleLog();
    this._hookConsoleTime();
    this._hookConsoleClear();

    // convenient for other uses
    (<any>window)._vcOrigConsole = this.origConsole;
  }

  protected _hookConsoleLog() {
    // @ts-ignore
    this.LOG_METHODS.map((method: LogMethod) => {
      window.console[method] = ((...args: any[]) => {
        this.addLogItem({
          type: method,
          origData: args || []
        });
      }).bind(window.console);
    });
  }

  protected _hookConsoleTime() {
    const timeLog: { [label: string]: number } = {};

    window.console.time = ((label: string = '') => {
      timeLog[label] = Date.now();
    }).bind(window.console);

    window.console.timeEnd = ((label: string = '') => {
      const pre = timeLog[label];
      let t = 0;
      if (pre) {
        t = Date.now() - pre;
        delete timeLog[label];
      }
      this.addLogItem({
        type: 'log',
        origData: [`${label}: ${t}ms`]
      });
    }).bind(window.console);
  }

  protected _hookConsoleClear() {
    window.console.clear = ((...args: any[]) => {
      this.clearLog();
      this.callOriginalConsole('clear', ...args);
    }).bind(window.console);
  }

  public clearLog() {}

  /**
   * Call origin `window.console[method](...args)`
   */
  public callOriginalConsole(method: string, ...args: any[]) {
    if (typeof this.origConsole[method] === 'function') {
      this.origConsole[method].apply(window.console, args);
    }
  }

  /**
   * Recover `window.console`.
   */
  public unmockConsole() {
    // recover original console methods
    for (const method in this.origConsole) {
      (window.console as any)[method] = this.origConsole[method] as any;
      delete this.origConsole[method];
    }
    if ((<any>window)._vcOrigConsole) {
      delete (<any>window)._vcOrigConsole;
    }
  }

  /**
   * Add a GioKit log.
   */
  public addLogItem(
    item: {
      type: LogMethod;
      origData: any[];
    } = { type: 'log', origData: [] },
    opt?: any
  ) {
    const log: LogItem = {
      _id: guid(),
      type: item.type,
      cmdType: opt?.cmdType,
      time: Date.now(),
      data: getLogDatasWithFormatting(item.origData || []),
      repeated: 0
    };
    _logQueue.update((o: any) => {
      return [...o, log];
    });
    if (!opt?.noOrig) {
      // logging to original console
      this.callOriginalConsole(item.type, ...item.origData);
    }
  }
}
