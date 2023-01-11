import { writable } from 'svelte/store';

export const _openGioKit = writable<boolean>(true);
export const _activeTool = writable<string>('log');
export const _showRealTimeMonitor = writable<boolean>(false);
