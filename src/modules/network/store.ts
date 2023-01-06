import { writable } from 'svelte/store';
import { RequestItem } from './model';

export const _requestQueue = writable<RequestItem[]>([]);
export const _activeReqType = writable('gio');
export const _clearVisible = writable<boolean>(false);
