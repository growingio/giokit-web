import { _activeStorage } from './store';
import { get } from 'svelte/store';
import Cookies from 'js-cookie';

export default class Storage {
  getAll = () => {
    switch (get(_activeStorage)) {
      case 'cookie':
        return Cookies.get();
      case 'local':
        return { ...localStorage };
      case 'session':
        return { ...sessionStorage };
      default:
        break;
    }
  };

  getItem = (key: string) => {
    switch (get(_activeStorage)) {
      case 'cookie':
        return Cookies.get(key);
      case 'local':
        return localStorage.getItem(key);
      case 'session':
        return sessionStorage.getItem(key);
      default:
        break;
    }
  };

  setItem = (key: string, value: string) => {
    switch (get(_activeStorage)) {
      case 'cookie':
        Cookies.set(key, value);
        break;
      case 'local':
        localStorage.setItem(key, value);
        break;
      case 'session':
        sessionStorage.setItem(key, value);
        break;
      default:
        break;
    }
  };

  removeItem = (key: string) => {
    switch (get(_activeStorage)) {
      case 'cookie':
        Cookies.remove(key);
        break;
      case 'local':
        localStorage.removeItem(key);
        break;
      case 'session':
        sessionStorage.removeItem(key);
        break;
      default:
        break;
    }
  };
}
