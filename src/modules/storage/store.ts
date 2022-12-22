import { keys } from '@/utils/glodash';
import { writable, get } from 'svelte/store';
import Cookies from 'js-cookie';

export const _activeStorage = writable<string>('cookie');
export const _handledIdx = writable<number>(-1);
export const _storageValue = writable<any[]>([]);

export const getters: any = {
  cookie: () => {
    const cookieStore = Cookies.get();
    return keys(cookieStore).map((k) => ({
      key: k,
      value: cookieStore[k]
    }));
  },
  local: () => {
    return keys({ ...localStorage }).map((k) => ({
      key: k,
      value: localStorage[k]
    }));
  },
  session: () => {
    return keys({ ...sessionStorage }).map((k) => ({
      key: k,
      value: sessionStorage[k]
    }));
  }
};

// 更新当前激活的存储
export const refreshStorage = () => {
  _storageValue.set(getters[get(_activeStorage)]());
};
