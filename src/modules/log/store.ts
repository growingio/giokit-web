import { writable } from 'svelte/store';

export const _activeTab = writable('all');
export const _logQueue = writable<any>([]);
export const _clearVisible = writable<boolean>(false);
export const _searchVisible = writable<boolean>(false);
export const _commandVisble = writable<boolean>(false);
export const _searchValue = writable<string>('');
