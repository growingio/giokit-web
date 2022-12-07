import { writable } from 'svelte/store';

export const _requestQueue = writable([]);
export const _activeReqType = writable('gio');
