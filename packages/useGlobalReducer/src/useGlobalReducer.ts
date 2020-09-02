import { useReducer, useCallback } from 'react';
import getGlobalWindowName from '@sackrin/useglobalcommon/lib/getGlobalWindowName';
import getGlobalWindowState from '@sackrin/useglobalcommon/lib/getGlobalWindowState';

type UseGlobalReducer = <R extends React.Reducer<any, any>, I>(
  reducer: R,
  defaultState: I & React.ReducerState<R>,
  path: string,
  prefix?: string,
) => [any, React.Dispatch<any>];

const useGlobalReducer: UseGlobalReducer = (
  reducer,
  defaultState,
  path,
  prefix = 'GLOBAL',
) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const windowName = getGlobalWindowName('REDUCER', path, prefix);
  const windowStash =
    window[windowName] || getGlobalWindowState(state, windowName);
  windowStash.subscribe((action: any) => {
    dispatch(action);
  });
  const _dispatch = useCallback(
    (action) => {
      dispatch(action);
      windowStash.next(action);
    },
    [windowStash, dispatch],
  );
  return [state, _dispatch];
};

export default useGlobalReducer;
