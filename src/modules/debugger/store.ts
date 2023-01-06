import { writable } from 'svelte/store';
import { GIOEVENTTYPES } from '@/constants/constants';
import { RequestItem } from '../network/model';

export const _clearVisible = writable<boolean>(false);
export const _filterActive = writable<string[]>([...GIOEVENTTYPES]);
export const _filterVisible = writable<boolean>(false);
export const _gioActive = writable<string>('');
export const _gioActiveEvent = writable<RequestItem | undefined>();
export const _gioRequestQueue = writable<RequestItem[]>([]);
export const _openMonitor = writable<boolean>(false);
