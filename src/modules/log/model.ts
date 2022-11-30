import { getLogDatasWithFormatting, guid } from '@/utils/tools';
import { _logQueue } from './store';

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
    this.mockConsole();
  }

  /**
   * Hook `window.console` with vConsole log method.
   * Methods will be hooked only once.
   */
  public mockConsole() {
    if (typeof this.origConsole.log === 'function') {
      return;
    }

    // save original console object
    if (!window.console) {
      (<any>window.console) = {};
    } else {
      this.LOG_METHODS.map((method) => {
        this.origConsole[method] = window.console[method];
      });
      this.origConsole.time = window.console.time;
      this.origConsole.timeEnd = window.console.timeEnd;
      this.origConsole.clear = window.console.clear;
    }

    this._mockConsoleLog();
    this._mockConsoleTime();
    this._mockConsoleClear();

    // convenient for other uses
    (<any>window)._vcOrigConsole = this.origConsole;
  }

  protected _mockConsoleLog() {
    this.LOG_METHODS.map((method) => {
      window.console[method] = ((...args) => {
        this.addLog({
          type: method,
          origData: args || []
        });
      }).bind(window.console);
    });
  }

  protected _mockConsoleTime() {
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
      this.addLog({
        type: 'log',
        origData: [`${label}: ${t}ms`]
      });
    }).bind(window.console);
  }

  protected _mockConsoleClear() {
    window.console.clear = ((...args) => {
      this.clearLog();
      this.callOriginalConsole('clear', ...args);
    }).bind(window.console);
  }

  public clearLog() {}

  /**
   * Call origin `window.console[method](...args)`
   */
  public callOriginalConsole(method: string, ...args) {
    if (typeof this.origConsole[method] === 'function') {
      this.origConsole[method].apply(window.console, args);
    }
  }

  /**
   * Add a vConsole log.
   */
  public addLog(
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
    _logQueue.update((o) => {
      return [...o, log];
    });
    if (!opt?.noOrig) {
      // logging to original console
      this.callOriginalConsole(item.type, ...item.origData);
    }
  }
}