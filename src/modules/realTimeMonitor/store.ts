import { writable } from 'svelte/store';

export const _appearedIds = writable<string[]>([]);
