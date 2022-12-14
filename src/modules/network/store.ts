import { GIOEVENTTYPES } from '@/constants/constants';
import { writable } from 'svelte/store';
import { RequestItem } from './model';

export const _requestQueue = writable<RequestItem[]>([]);
export const _gioRequestQueue = writable<RequestItem[]>([]);
export const _activeReqType = writable('gio');
export const _gioActive = writable<string>('');
export const _gioActiveEvent = writable<RequestItem | undefined>();
export const _clearVisible = writable<boolean>(false);
export const _filterVisible = writable<boolean>(false);
export const _filterActive = writable<string[]>([...GIOEVENTTYPES]);
