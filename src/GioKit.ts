import Giokit from './GioKit.svelte';
import './index.less';

export class GioKit {
  public version: string = '__VERSION__';
  public inited: boolean = false;

  private componentInstance: any = null;

  constructor() {
    if (GioKit.instance && this.inited) {
      console.info('[GrowingIO]：GioKit is already initialized.');
      return GioKit.instance;
    }
    GioKit.instance = this;

    // try to init
    const _onload = () => {
      if (this.inited) {
        return;
      }
      this._initComponent();
    };
    if (document !== undefined) {
      if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', _onload);
      } else {
        _onload();
      }
    } else {
      // if document does not exist, wait for it
      let _timer: any;
      const _pollingDocument = () => {
        if (!!document && document.readyState == 'complete') {
          _timer && clearTimeout(_timer);
          _onload();
        } else {
          _timer = setTimeout(_pollingDocument, 1);
        }
      };
      _timer = setTimeout(_pollingDocument, 1);
    }
  }

  /**
   * Get singleton instance.
   **/
  public static get instance() {
    return (<any>window).__GIOKIT__;
  }

  /**
   * Set singleton instance.
   **/
  public static set instance(value: GioKit | undefined) {
    if (value !== undefined && !(value instanceof GioKit)) {
      console.debug(
        '[GrowingIO]：Cannot set `GioKit.instance` because the value is not the instance of GioKit.'
      );
      return;
    }
    (<any>window).__GIOKIT__ = value;
  }

  /**
   * Init svelte component.
   */
  private _initComponent = () => {
    const switchX = <any>localStorage.getItem('GioKit_switch_x') * 1;
    const switchY = <any>localStorage.getItem('GioKit_switch_y') * 1;

    this.componentInstance = new Giokit({
      target: document.documentElement,
      props: {
        switchButtonPosition: {
          x: switchX,
          y: switchY
        }
      }
    });
    this.inited = true;
  };

  /**
   * Remove GioKit.
   */
  public destroy() {
    if (!this.inited) {
      return;
    }
    // reverse isInited when destroyed
    this.inited = false;
    GioKit.instance = undefined;
    // remove component
    this.componentInstance.$destroy();
  }
}
