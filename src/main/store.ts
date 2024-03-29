import { writable } from 'svelte/store';

export const _openGioKit = writable<boolean>(false);
export const _activeTool = writable<string>('');
export const _showRealTimeMonitor = writable<boolean>(false);
