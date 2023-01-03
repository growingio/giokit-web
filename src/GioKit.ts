import Giokit from './GioKit.svelte';
import '@/styles/index.less';

export class GioKit {
  // 版本号
  public version: string = '__VERSION__';
  // 初始化标识
  public inited: boolean = false;
  // svelte组件实例
  private componentInstance: any = null;

  constructor() {
    if (GioKit.instance && this.inited) {
      console.info('[GrowingIO]：GioKit is already initialized.');
      return GioKit.instance;
    }
    GioKit.instance = this;

    const _onLoad = () => {
      if (this.inited) {
        return;
      }
      this._initComponent();
    };
    if (document !== undefined) {
      // 校验document和状态，初始化svelte组件
      if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', _onLoad);
      } else {
        _onLoad();
      }
    } else {
      // document不存在，等待document加载完成
      let _timer: any;
      const _pollingDocument = () => {
        if (!!document && document.readyState == 'complete') {
          _timer && clearTimeout(_timer);
          _onLoad();
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

  // 初始化svelte组件
  private _initComponent = () => {
    // 从存储中获取坐标
    const switchX = <any>localStorage.getItem('GioKit_switch_x') * 1;
    const switchY = <any>localStorage.getItem('GioKit_switch_y') * 1;
    // 创建svelte组件实例
    this.componentInstance = new Giokit({
      target: document.documentElement,
      props: {
        switchButtonPosition: {
          x: switchX,
          y: switchY
        }
      }
    });
    // 标记初始化完成
    this.inited = true;
  };

  // 销毁svelte组件
  public destroy() {
    if (!this.inited) {
      return;
    }
    // 重置状态
    this.inited = false;
    GioKit.instance = undefined;
    // 移除组件
    this.componentInstance.$destroy();
  }
}
