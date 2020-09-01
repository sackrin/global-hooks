import { Subject } from 'rxjs';

export type GetGlobalWindowState = (defaultState: any, windowName: string) => any;

const getMicroUIWindowState: GetGlobalWindowState = (
  defaultState,
  windowName,
) => {
  window[windowName] = new Subject();
  window[windowName].next(defaultState);
  return window[windowName];
};

export default getMicroUIWindowState;
