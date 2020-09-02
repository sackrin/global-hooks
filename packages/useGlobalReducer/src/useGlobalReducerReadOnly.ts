import { useReducer } from 'react';
import getGlobalWindowName from '@sackrin/useglobalcommon/lib/getGlobalWindowName';
import getGlobalWindowState from '@sackrin/useglobalcommon/lib/getGlobalWindowState';

type UseGlobalReducerReadOnly = <R extends React.Reducer<any, any>, I>(
  reducer: R,
  defaultState: I & React.ReducerState<R>,
  path: string,
  prefix?: string,
) => [any];

const useGlobalReducerReadOnly: UseGlobalReducerReadOnly = (
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
  return [state];
};

export default useGlobalReducerReadOnly;
