import { writable } from 'svelte/store';

export const _activeTab = writable('all');
export const _logQueue = writable([]);
