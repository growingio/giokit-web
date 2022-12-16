import { writable } from 'svelte/store';

export const step1Initial = {
  projectId: '',
  dataSourceId: '',
  scheme: 'https://',
  host: '',
  version: ''
};
export const step2Initial = {
  gioCompress: false,
  gioEmbeddedAdapter: false,
  gioEventAutoTracking: false,
  gioHybridAdapter: false,
  gioHybridCircle: false,
  gioImpressionTracking: false,
  gioWebCircle: false,
  appId: '',
  debug: false,
  enableIdMapping: false,
  hashtag: false
};
export const _initOptions = writable<any>({ ...step1Initial, ...step2Initial });
